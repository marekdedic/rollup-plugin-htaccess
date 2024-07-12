import { findAll } from "domutils";
import { readFile, writeFile } from "fs";
import { ElementType, parseDocument } from "htmlparser2";
import { join } from "path";
import type { OutputOptions, PluginHooks } from "rollup";

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

function closeBundle(
  options: ExtractMetaCSPEnabledOptions,
  htaccessFileName: string,
): PluginHooks["closeBundle"] {
  return {
    order: "post",
    sequential: true,
    handler: async (): Promise<void> => {
      const cspValues: Array<string> = [];
      const files = options.files;
      for (const file of files) {
        let fileContents = await asyncReadFile(file);
        if (fileContents === null) {
          continue;
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
        cspValues.push(...cspMetaElems.map((elem) => elem.attribs.content));
        for (const cspMetaElem of cspMetaElems) {
          fileContents =
            fileContents.substring(0, cspMetaElem.startIndex!) +
            fileContents.substring(cspMetaElem.endIndex! + 1);
        }
        await asyncWriteFile(file, fileContents);
      }
      const htaccessFilePath =
        options.htaccessFile ?? join(outputOptions.dir ?? "", htaccessFileName);
      let htaccessFile = await asyncReadFile(htaccessFilePath);
      if (htaccessFile === null) {
        throw new Error("TODO");
      }
      htaccessFile +=
        cspValues
          .map(
            (value) =>
              'Header always set Content-Security-Policy "' +
              escapeValue(value) +
              '"',
          )
          .join("\n") + "\n";
      console.log(htaccessFilePath);
      console.log(htaccessFile);
      await asyncWriteFile(htaccessFilePath, htaccessFile);
    },
  };
}

export function extractMetaCSP(
  options: ExtractMetaCSPEnabledOptions,
  htaccessFileName: string,
): Partial<PluginHooks> {
  return {
    renderStart,
    closeBundle: closeBundle(options, htaccessFileName),
  };
}
