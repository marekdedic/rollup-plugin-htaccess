import type { OutputOptions, PluginContext, PluginHooks } from "rollup";

import { findAll } from "domutils";
import { ElementType, parseDocument } from "htmlparser2";
import { join } from "path";

import type { Options } from "./index";

import { escapeValue, readFile, writeFile } from "./utils";

/**
 * @public
 */
export interface ExtractMetaCSPEnabledOptions {
  enabled: true;
  htaccessFile?: string;
  files: Array<string>;
}

/**
 * @public
 */
export type ExtractMetaCSPOptions =
  | { enabled: false }
  | ExtractMetaCSPEnabledOptions;

let outputOptions: OutputOptions = {};

function renderStart(outputOptionsValue: OutputOptions): void {
  outputOptions = outputOptionsValue;
}

async function extractCSPValuesFromHTMLFile(
  fileName: string,
): Promise<Array<string>> {
  let fileContents = "";
  try {
    fileContents = await readFile(fileName);
  } catch {
    return [];
  }
  const dom = parseDocument(fileContents, {
    withStartIndices: true,
    withEndIndices: true,
  });
  const cspMetaElems = findAll(
    (elem) =>
      elem.type === ElementType.Tag &&
      elem.name === "meta" &&
      "http-equiv" in elem.attribs &&
      elem.attribs["http-equiv"].toLowerCase() === "content-security-policy",
    dom.children,
  );
  const cspValues = cspMetaElems.map((elem) => elem.attribs.content);
  for (const cspMetaElem of cspMetaElems) {
    fileContents =
      fileContents.substring(0, cspMetaElem.startIndex!) +
      fileContents.substring(cspMetaElem.endIndex! + 1);
  }
  await writeFile(fileName, fileContents);
  return cspValues;
}

async function writeCSPValuesToHtaccessFile(
  context: PluginContext,
  cspValues: Array<string>,
  options: ExtractMetaCSPEnabledOptions,
  htaccessFileName: string,
): Promise<void> {
  const path =
    options.htaccessFile ?? join(outputOptions.dir ?? "", htaccessFileName);
  let fileContents = "";
  try {
    fileContents = await readFile(path);
  } catch {
    context.warn(
      'Could not read htaccess file at path "' +
        path +
        '", writing extracted CSP to new file.',
    );
  }
  fileContents +=
    cspValues
      .map(
        (value) =>
          'Header always set Content-Security-Policy "' +
          escapeValue(value) +
          '"',
      )
      .join("\n") + "\n";
  await writeFile(path, fileContents);
}

function closeBundle(
  options: ExtractMetaCSPEnabledOptions,
  htaccessFileName: string,
): PluginHooks["closeBundle"] {
  return {
    order: "post",
    sequential: true,
    async handler(this: PluginContext): Promise<void> {
      let cspValues = (
        await Promise.all(
          options.files.map(async (file) => extractCSPValuesFromHTMLFile(file)),
        )
      ).flat();
      cspValues = [...new Set(cspValues)];
      if (cspValues.length > 1) {
        this.error(
          "Found multiple conflicting CSP directives when extracting from meta tags.",
        );
      }
      await writeCSPValuesToHtaccessFile(
        this,
        cspValues,
        options,
        htaccessFileName,
      );
    },
  };
}

export function extractMetaCSP(options: Options): Partial<PluginHooks> {
  if (!options.extractMetaCSP.enabled) {
    return {};
  }
  return {
    renderStart,
    closeBundle: closeBundle(options.extractMetaCSP, options.fileName),
  };
}
