import type { Plugin } from "rollup";

import { buildHeader, type HeaderSpecUnion } from "./headers";
import { readTemplate } from "./template";

interface Spec {
  headers?: Array<HeaderSpecUnion>;
}

export interface Options {
  fileName: string;
  template: string | undefined;
  spec: Spec;
}

async function buildHtaccessFile(
  options: Options,
  root: string,
): Promise<string> {
  let output = "";
  if (options.template !== undefined) {
    output += await readTemplate(root, options.template);
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
    async generateBundle(): Promise<void> {
      this.emitFile({
        type: "asset",
        fileName: options.fileName,
        source: await buildHtaccessFile(options, root),
      });
    },
  } as Plugin;
}
