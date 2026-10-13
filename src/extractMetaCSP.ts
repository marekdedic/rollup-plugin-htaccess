import { findAll } from "domutils";
import { glob } from "glob";
import { ElementType, parseDocument } from "htmlparser2";
import { join, resolve } from "node:path";

import type { MinimalPluginContext, OutputOptions } from "./plugin-types";

import { escapeRegexString, escapeValue, readFile, writeFile } from "./utils";

// Policies already written to each htaccess file (keyed by its absolute path), so that repeated extraction runs don't append them again
export type ExtractedPolicies = Map<string, ExtractedFilePolicies>;

export interface ExtractMetaCSPEnabledOptions {
  defaultPolicyFile?: string;
  enabled: true;
  outputDir?: string;
  perFilePolicyFiles?: Array<string>;
}

export type ExtractMetaCSPOptions =
  { enabled: false } | ExtractMetaCSPEnabledOptions;

interface ExtractedFilePolicies {
  defaultPolicy: string | null;
  perFilePolicies: Map<string, string>;
}

export async function extractMetaCSP(
  context: MinimalPluginContext,
  options: ExtractMetaCSPEnabledOptions,
  rollupOutputOptions: OutputOptions | undefined,
  htaccessFileName: string,
  extractedPolicies: ExtractedPolicies,
): Promise<void> {
  const outputDir =
    options.outputDir ?? rollupOutputOptions?.dir ?? process.cwd();
  const defaultPolicy =
    options.defaultPolicyFile === undefined
      ? null
      : await extractCSPValueFromHTMLFile(
          context,
          join(outputDir, options.defaultPolicyFile),
        );
  const perFilePolicyFiles = await glob(options.perFilePolicyFiles ?? [], {
    cwd: outputDir,
  });
  perFilePolicyFiles.sort();
  const perFilePolicies = Object.fromEntries(
    (
      await Promise.all(
        perFilePolicyFiles.map(async (fileName) => [
          fileName,
          await extractCSPValueFromHTMLFile(context, join(outputDir, fileName)),
        ]),
      )
    ).filter(([_, policy]) => policy !== null) as Array<[string, string]>,
  );
  const path = htaccessFilePath(outputDir, htaccessFileName);
  const extracted = extractedPolicies.get(path) ?? {
    defaultPolicy: null,
    perFilePolicies: new Map<string, string>(),
  };
  const newDefaultPolicy = filterExtractedPolicy(
    context,
    options.defaultPolicyFile ?? "",
    defaultPolicy,
    extracted.defaultPolicy,
  );
  const newPerFilePolicies = Object.fromEntries(
    Object.entries(perFilePolicies).filter(
      ([fileName, policy]) =>
        filterExtractedPolicy(
          context,
          fileName,
          policy,
          extracted.perFilePolicies.get(fileName) ?? null,
        ) !== null,
    ),
  );
  if (newDefaultPolicy !== null) {
    extracted.defaultPolicy = newDefaultPolicy;
  }
  for (const [fileName, policy] of Object.entries(newPerFilePolicies)) {
    extracted.perFilePolicies.set(fileName, policy);
  }
  extractedPolicies.set(path, extracted);
  await writeCSPValuesToHtaccessFile(
    newDefaultPolicy,
    newPerFilePolicies,
    path,
  );
}

export function htaccessFilePath(
  outputDir: string | undefined,
  htaccessFileName: string,
): string {
  return resolve(outputDir ?? process.cwd(), htaccessFileName);
}

async function extractCSPValueFromHTMLFile(
  context: MinimalPluginContext,
  fileName: string,
): Promise<string | null> {
  // eslint-disable-next-line no-useless-assignment -- no way to assign this in the try block and have it available afterwards
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

// Returns the policy if it hasn't been written to the htaccess file yet, null if it has
function filterExtractedPolicy(
  context: MinimalPluginContext,
  fileName: string,
  policy: string | null,
  extractedPolicy: string | null,
): string | null {
  if (policy === null || extractedPolicy === null) {
    return policy;
  }
  if (policy !== extractedPolicy) {
    context.error(
      `Found a CSP meta tag in "${fileName}" that conflicts with a policy previously extracted from it.`,
    );
  }
  return null;
}

async function writeCSPValuesToHtaccessFile(
  defaultPolicy: string | null,
  perFilePolicies: Record<string, string>,
  path: string,
): Promise<void> {
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
