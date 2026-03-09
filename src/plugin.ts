import type { Plugin as RolldownPlugin } from "rolldown";
import type {
  NormalizedOutputOptions,
  PluginContext,
  Plugin as RollupPlugin,
} from "rollup";
import type { Plugin as VitePlugin } from "vite";

import {
  extractMetaCSP,
  type ExtractMetaCSPEnabledOptions,
  type ExtractMetaCSPOptions,
} from "./extractMetaCSP";
import { buildSpec, type Spec } from "./spec";
import { readTemplate } from "./template";

/**
 * @public
 */
export interface Options {
  extractMetaCSP: ExtractMetaCSPOptions;
  fileName: string;
  spec: Spec;
  template: string | undefined;
}

/**
 * @public
 */
export function htaccess(
  opts?: Partial<Options>,
): RolldownPlugin & RollupPlugin & VitePlugin {
  const options: Options = {
    extractMetaCSP: { enabled: false },
    fileName: ".htaccess",
    spec: {},
    template: undefined,
    ...opts,
  };
  let rollupOutputOptions: NormalizedOutputOptions | undefined = undefined;
  let root = "";

  const rollupPlugin: Omit<VitePlugin, keyof RollupPlugin> & RollupPlugin = {
    ...(options.extractMetaCSP.enabled && {
      closeBundle: {
        async handler(): Promise<void> {
          await extractMetaCSP(
            this,
            options.extractMetaCSP as ExtractMetaCSPEnabledOptions,
            rollupOutputOptions,
            options.fileName,
          );
        },
        order: "post",
        sequential: true,
      },
    }),
    configResolved: (config: { root: string }): void => {
      root = config.root;
    },
    async generateBundle(): Promise<void> {
      this.emitFile({
        fileName: options.fileName,
        source: await buildHtaccessFile(this, options, root),
        type: "asset",
      });
    },
    name: "htaccess",
    renderStart: (outputOptions: NormalizedOutputOptions): void => {
      rollupOutputOptions = outputOptions;
    },
  };
  return rollupPlugin as RolldownPlugin & RollupPlugin & VitePlugin;
}

async function buildHtaccessFile(
  context: PluginContext,
  options: Options,
  root: string,
): Promise<string> {
  let output = "";
  if (options.template !== undefined) {
    output += await readTemplate(context, root, options.template);
  }
  output += buildSpec(context, options.spec);
  return output;
}
