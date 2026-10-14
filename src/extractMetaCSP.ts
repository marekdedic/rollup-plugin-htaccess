import { findAll } from "domutils";
import { glob } from "glob";
import { ElementType, parseDocument } from "htmlparser2";
import { join, resolve } from "node:path";

import type { MinimalPluginContext } from "./plugin-types";

import { escapeRegexString, escapeValue, readFile, writeFile } from "./utils";

// Policies already written to each htaccess file (keyed by its absolute path)
export type ExtractedPolicies = Map<string, Map<string, string>>;

export interface ExtractMetaCSPEnabledOptions {
  defaultPolicyFile?: string;
  enabled: true;
  outputDir?: string;
  perFilePolicyFiles?: Array<string>;
}

export type ExtractMetaCSPOptions =
  { enabled: false } | ExtractMetaCSPEnabledOptions;

interface ExtractedPolicy extends PolicySource {
  policy: string;
}

// The HTML file a policy is extracted from. The default policy applies to the whole site, others only to that file
interface PolicySource {
  fileName: string;
  isDefault: boolean;
}

export async function extractMetaCSP(
  context: MinimalPluginContext,
  options: ExtractMetaCSPEnabledOptions,
  bundlerOutputDir: string | undefined,
  htaccessFileName: string,
  extractedPolicies: ExtractedPolicies,
): Promise<void> {
  const outputDir = options.outputDir ?? bundlerOutputDir ?? process.cwd();
  const path = htaccessFilePath(outputDir, htaccessFileName);
  const policies = await readPolicies(
    context,
    outputDir,
    await findPolicySources(options, outputDir),
  );
  const writtenPolicies =
    extractedPolicies.get(path) ?? new Map<string, string>();
  extractedPolicies.set(path, writtenPolicies);
  const newPolicies = skipWrittenPolicies(context, policies, writtenPolicies);
  await appendToFile(path, newPolicies.map(buildCSPDirective).join(""));
}

export function htaccessFilePath(
  outputDir: string | undefined,
  htaccessFileName: string,
): string {
  return resolve(outputDir ?? process.cwd(), htaccessFileName);
}

async function appendToFile(path: string, contents: string): Promise<void> {
  const fileContents = await readFile(path).catch(() => "");
  await writeFile(path, fileContents + contents);
}

function buildCSPDirective({
  fileName,
  isDefault,
  policy,
}: ExtractedPolicy): string {
  const header = `Header always set Content-Security-Policy "${escapeValue(policy)}"`;
  if (isDefault) {
    return `${header}\n`;
  }
  if (!fileName.includes("/")) {
    return `<Files "${escapeValue(fileName)}">\n\t${header}\n</Files>\n`;
  }
  return `<If "%{REQUEST_FILENAME} =~ /${escapeRegexString(fileName)}$/">\n\t${header}\n</If>\n`;
}

async function extractCSPFromHTMLFile(
  context: MinimalPluginContext,
  outputDir: string,
  fileName: string,
): Promise<string | null> {
  const path = join(outputDir, fileName);
  const html = await readFile(path).catch(() => null);
  if (html === null) {
    return null;
  }
  const { html: strippedHTML, policies } = stripCSPMetaTags(html);
  if (policies.length === 0) {
    return null;
  }
  if (policies.length > 1) {
    context.error(
      `Found multiple conflicting CSP directives in "${fileName}" when extracting from meta tags.`,
    );
  }
  await writeFile(path, strippedHTML);
  return policies[0];
}

async function findPolicySources(
  options: ExtractMetaCSPEnabledOptions,
  outputDir: string,
): Promise<Array<PolicySource>> {
  const perFilePolicyFiles = await glob(options.perFilePolicyFiles ?? [], {
    cwd: outputDir,
  });
  perFilePolicyFiles.sort();
  const perFileSources = perFilePolicyFiles.map((fileName) => ({
    fileName,
    isDefault: false,
  }));
  const { defaultPolicyFile } = options;
  if (defaultPolicyFile === undefined) {
    return perFileSources;
  }
  // The default policy takes precedence, a file used for both only provides the default one
  return [
    { fileName: defaultPolicyFile, isDefault: true },
    ...perFileSources.filter(
      ({ fileName }) =>
        join(outputDir, fileName) !== join(outputDir, defaultPolicyFile),
    ),
  ];
}

async function readPolicies(
  context: MinimalPluginContext,
  outputDir: string,
  sources: Array<PolicySource>,
): Promise<Array<ExtractedPolicy>> {
  const policies = await Promise.all(
    sources.map(async (source) => ({
      ...source,
      policy: await extractCSPFromHTMLFile(context, outputDir, source.fileName),
    })),
  );
  return policies.filter(
    (policy): policy is ExtractedPolicy => policy.policy !== null,
  );
}

// Returns the policies not yet written to the htaccess file and records them as written
function skipWrittenPolicies(
  context: MinimalPluginContext,
  policies: Array<ExtractedPolicy>,
  writtenPolicies: Map<string, string>,
): Array<ExtractedPolicy> {
  return policies.filter(({ fileName, policy }) => {
    const writtenPolicy = writtenPolicies.get(fileName);
    if (writtenPolicy === undefined) {
      writtenPolicies.set(fileName, policy);
      return true;
    }
    if (writtenPolicy !== policy) {
      context.error(
        `Found a CSP meta tag in "${fileName}" that conflicts with a policy previously extracted from it.`,
      );
    }
    return false;
  });
}

function stripCSPMetaTags(html: string): {
  html: string;
  policies: Array<string>;
} {
  const dom = parseDocument(html, {
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
  let strippedHTML = html;
  // Removed last to first so that the indices of the remaining elements stay valid
  for (const cspMetaElem of cspMetaElems.toReversed()) {
    if (cspMetaElem.startIndex !== null && cspMetaElem.endIndex !== null) {
      strippedHTML =
        strippedHTML.substring(0, cspMetaElem.startIndex) +
        strippedHTML.substring(cspMetaElem.endIndex + 1);
    }
  }
  return {
    html: strippedHTML,
    policies: [...new Set(cspMetaElems.map((elem) => elem.attribs["content"]))],
  };
}
