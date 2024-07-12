import type { Plugin as RollupPlugin } from "rollup";
import type { Plugin as VitePlugin } from "vite";

import { extractMetaCSP, type ExtractMetaCSPOptions } from "./extractMetaCSP";
import { buildSpec, type Spec } from "./spec";
import { readTemplate } from "./template";

/**
 * @public
 */
export interface Options {
  fileName: string;
  template: string | undefined;
  spec: Spec;
  extractMetaCSP: ExtractMetaCSPOptions;
}

async function buildHtaccessFile(
  options: Options,
  root: string,
): Promise<string> {
  let output = "";
  if (options.template !== undefined) {
    output += await readTemplate(root, options.template);
  }
  output += buildSpec(options.spec);
  return output;
}

/**
 * @public
 */
export function htaccess(opts?: Partial<Options>): RollupPlugin & VitePlugin {
  const options: Options = {
    fileName: ".htaccess",
    template: undefined,
    spec: {},
    extractMetaCSP: { enabled: false },
    ...opts,
  };
  let root = "";

  let rollupPlugin: RollupPlugin & VitePlugin = {
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
  };
  if (options.extractMetaCSP.enabled) {
    rollupPlugin = {
      ...rollupPlugin,
      ...extractMetaCSP(options.extractMetaCSP),
    };
  }
  return rollupPlugin;
}
