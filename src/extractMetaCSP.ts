import type {
  NormalizedOutputOptions,
  PluginContext,
  PluginHooks,
  Plugin as RollupPlugin,
} from "rollup";
import type { Plugin as VitePlugin } from "vite";

import { findAll } from "domutils";
import { glob } from "glob";
import { ElementType, parseDocument } from "htmlparser2";
import { join } from "path";

import type { Options } from "./index";

import { escapeRegexString, escapeValue, readFile, writeFile } from "./utils";

/**
 * @public
 */
export interface ExtractMetaCSPEnabledOptions {
  defaultPolicyFile?: string;
  enabled: true;
  outputDir?: string;
  perFilePolicyFiles?: Array<string>;
}

/**
 * @public
 */
export type ExtractMetaCSPOptions =
  | { enabled: false }
  | ExtractMetaCSPEnabledOptions;

let outputOptions: NormalizedOutputOptions | undefined = undefined;

export function extractMetaCSP(
  options: Options,
): Partial<RollupPlugin & VitePlugin> {
  if (!options.extractMetaCSP.enabled) {
    return {};
  }
  return {
    closeBundle: closeBundle(options.extractMetaCSP, options.fileName),
    renderStart,
  };
}

function closeBundle(
  options: ExtractMetaCSPEnabledOptions,
  htaccessFileName: string,
): PluginHooks["closeBundle"] {
  return {
    async handler(this: PluginContext): Promise<void> {
      const outputDir =
        options.outputDir ?? outputOptions?.dir ?? process.cwd();
      const defaultPolicy =
        options.defaultPolicyFile !== undefined
          ? await extractCSPValueFromHTMLFile(
              this,
              join(outputDir, options.defaultPolicyFile),
            )
          : null;
      const perFilePolicyFiles = await glob(options.perFilePolicyFiles ?? [], {
        cwd: outputDir,
      });
      perFilePolicyFiles.sort();
      const perFilePolicies = Object.fromEntries(
        (
          await Promise.all(
            perFilePolicyFiles.map(async (fileName) => [
              fileName,
              await extractCSPValueFromHTMLFile(
                this,
                join(outputDir, fileName),
              ),
            ]),
          )
        ).filter(([_, policy]) => policy !== null) as Array<[string, string]>,
      );
      await writeCSPValuesToHtaccessFile(
        defaultPolicy,
        perFilePolicies,
        options,
        htaccessFileName,
      );
    },
    order: "post",
    sequential: true,
  };
}

async function extractCSPValueFromHTMLFile(
  context: PluginContext,
  fileName: string,
): Promise<string | null> {
  let fileContents = "";
  try {
    fileContents = await readFile(fileName);
  } catch {
    return null;
  }
  const dom = parseDocument(fileContents, {
    withEndIndices: true,
    withStartIndices: true,
  });
  const cspMetaElems = findAll(
    (elem) =>
      elem.type === ElementType.Tag &&
      elem.name === "meta" &&
      "http-equiv" in elem.attribs &&
      elem.attribs["http-equiv"].toLowerCase() === "content-security-policy",
    dom.children,
  );
  const cspValues = [
    ...new Set(cspMetaElems.map((elem) => elem.attribs["content"])),
  ];
  if (cspValues.length < 1) {
    return null;
  }
  if (cspValues.length > 1) {
    context.error(
      "Found multiple conflicting CSP directives when extracting from meta tags.",
    );
  }
  for (const cspMetaElem of cspMetaElems) {
    if (cspMetaElem.startIndex !== null && cspMetaElem.endIndex !== null) {
      fileContents =
        fileContents.substring(0, cspMetaElem.startIndex) +
        fileContents.substring(cspMetaElem.endIndex + 1);
    }
  }
  await writeFile(fileName, fileContents);
  return cspValues[0];
}

function renderStart(outputOptionsValue: NormalizedOutputOptions): void {
  outputOptions = outputOptionsValue;
}

async function writeCSPValuesToHtaccessFile(
  defaultPolicy: string | null,
  perFilePolicies: Record<string, string>,
  options: ExtractMetaCSPEnabledOptions,
  htaccessFileName: string,
): Promise<void> {
  const path = join(
    options.outputDir ?? outputOptions?.dir ?? process.cwd(),
    htaccessFileName,
  );
  let fileContents = await readFile(path).catch(() => "");
  if (defaultPolicy !== null) {
    fileContents += `Header always set Content-Security-Policy "${escapeValue(defaultPolicy)}"\n`;
  }
  function constructPerFileDirective([fileName, policy]: [
    string,
    string,
  ]): string {
    const innerDirective = `\n\tHeader always set Content-Security-Policy "${escapeValue(policy)}"\n`;
    if (!fileName.includes("/")) {
      return `<Files "${escapeValue(fileName)}">${innerDirective}</Files>\n`;
    }
    return `<If "%{REQUEST_FILENAME} =~ /${escapeRegexString(fileName)}$/">${innerDirective}</If>\n`;
  }
  fileContents += Object.entries(perFilePolicies)
    .map(constructPerFileDirective)
    .join("");
  await writeFile(path, fileContents);
}
