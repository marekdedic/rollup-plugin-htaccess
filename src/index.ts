import * as fs from "fs";
import * as path from "path";
import type { Plugin } from "rollup";

import { buildHeader, type HeaderSpecUnion } from "./headers";

interface Spec {
  headers?: Array<HeaderSpecUnion>;
}

export interface Options {
  fileName: string;
  template: string | undefined;
  spec: Spec;
}

function buildHtaccessFile(options: Options, root: string): string {
  let output = "";
  if (options.template !== undefined) {
    output +=
      fs
        .readFileSync(path.join(root, options.template), "utf8")
        .replace(/\r/g, "") + "\n";
  }
  for (const header of options.spec.headers ?? []) {
    output += buildHeader(header) + "\n";
  }
  return output;
}

export default function htaccess(opts?: Partial<Options>): Plugin {
  const options: Options = {
    fileName: ".htaccess",
    template: undefined,
    spec: {},
    ...opts,
  };
  let root = "";

  return {
    name: "htaccess",
    configResolved: (config: { root: string }): void => {
      root = config.root;
    },
    generateBundle(): void {
      this.emitFile({
        type: "asset",
        fileName: options.fileName,
        source: buildHtaccessFile(options, root),
      });
    },
  } as Plugin;
}
