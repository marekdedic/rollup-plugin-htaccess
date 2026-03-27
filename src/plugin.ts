import type { OutputOptions, PluginContext, PluginHook } from "./plugin-types";

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
export interface HtaccessPlugin {
  closeBundle?: PluginHook<(this: PluginContext) => Promise<void>>;
  configResolved?: PluginHook<(config: { root: string }) => void>;
  generateBundle?: PluginHook<(this: PluginContext) => Promise<void>>;
  name: string;
  renderStart?: PluginHook<(outputOptions: OutputOptions) => void>;
}

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
export function htaccess(opts?: Partial<Options>): HtaccessPlugin {
  const options: Options = {
    extractMetaCSP: { enabled: false },
    fileName: ".htaccess",
    spec: {},
    template: undefined,
    ...opts,
  };
  let rollupOutputOptions: OutputOptions | undefined = undefined;
  let root = "";

  return {
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
    renderStart: (outputOptions: OutputOptions): void => {
      rollupOutputOptions = outputOptions;
    },
  };
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
