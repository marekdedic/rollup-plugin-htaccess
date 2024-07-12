import { findAll } from "domutils";
import { readFile, writeFile } from "fs";
import { ElementType, parseDocument } from "htmlparser2";
import { join } from "path";
import type { OutputOptions, PluginHooks } from "rollup";

import type { Options } from "./index";
import { escapeValue } from "./utils";

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
  | ExtractMetaCSPEnabledOptions
  | { enabled: false };

async function asyncReadFile(path: string): Promise<string | null> {
  return new Promise<string | null>((resolve) => {
    readFile(path, "utf8", (err, data) => {
      if (err !== null) {
        resolve(null);
      }
      resolve(data);
    });
  });
}

async function asyncWriteFile(path: string, contents: string): Promise<void> {
  return new Promise<void>((resolve) => {
    writeFile(path, contents, () => {
      resolve();
    });
  });
}

let outputOptions: OutputOptions = {};

function renderStart(outputOptionsValue: OutputOptions): void {
  outputOptions = outputOptionsValue;
}

async function extractCSPValuesFromHTMLFile(
  fileName: string,
): Promise<Array<string>> {
  let fileContents = await asyncReadFile(fileName);
  if (fileContents === null) {
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
      elem.attribs["http-equiv"] === "content-security-policy",
    dom.children,
  );
  const cspValues = cspMetaElems.map((elem) => elem.attribs.content);
  for (const cspMetaElem of cspMetaElems) {
    fileContents =
      fileContents.substring(0, cspMetaElem.startIndex!) +
      fileContents.substring(cspMetaElem.endIndex! + 1);
  }
  await asyncWriteFile(fileName, fileContents);
  return cspValues;
}

async function writeCSPValuesToHtaccessFile(
  cspValues: Array<string>,
  options: ExtractMetaCSPEnabledOptions,
  htaccessFileName: string,
): Promise<void> {
  const path =
    options.htaccessFile ?? join(outputOptions.dir ?? "", htaccessFileName);
  let fileContents = await asyncReadFile(path);
  if (fileContents === null) {
    throw new Error('Could not read htaccess file at path "' + path + '".');
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
  await asyncWriteFile(path, fileContents);
}

function closeBundle(
  options: ExtractMetaCSPEnabledOptions,
  htaccessFileName: string,
): PluginHooks["closeBundle"] {
  return {
    order: "post",
    sequential: true,
    handler: async (): Promise<void> => {
      const cspValues = (
        await Promise.all(
          options.files.map(async (file) => extractCSPValuesFromHTMLFile(file)),
        )
      ).flat();
      await writeCSPValuesToHtaccessFile(cspValues, options, htaccessFileName);
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
