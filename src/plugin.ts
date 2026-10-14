import { resolve } from "node:path";

import type {
  MinimalPluginContext,
  OutputOptions,
  PluginContext,
  PluginHook,
  ViteBuilder,
} from "./plugin-types";

import {
  type ExtractedPolicies,
  extractMetaCSP,
  type ExtractMetaCSPOptions,
  htaccessFilePath,
} from "./extractMetaCSP";
import { buildSpec, type Spec } from "./spec";
import { readTemplate } from "./template";

export interface HtaccessPlugin {
  buildApp?: PluginHook<
    (this: MinimalPluginContext, builder: ViteBuilder) => Promise<void>
  >;
  closeBundle?: PluginHook<(this: PluginContext) => Promise<void>>;
  configResolved?: PluginHook<(config: { root: string }) => void>;
  generateBundle?: PluginHook<(this: PluginContext) => Promise<void>>;
  name: string;
  renderStart?: PluginHook<(outputOptions: OutputOptions) => void>;
}

export interface Options {
  extractMetaCSP: ExtractMetaCSPOptions;
  fileName: string;
  spec: Spec;
  template: string | undefined;
}

export function htaccess(opts?: Partial<Options>): HtaccessPlugin {
  const options: Options = {
    extractMetaCSP: { enabled: false },
    fileName: ".htaccess",
    spec: {},
    template: undefined,
    ...opts,
  };
  const extractMetaCSPOptions = options.extractMetaCSP;
  let rollupOutputOptions: OutputOptions | undefined = undefined;
  let root = "";
  const extractedPolicies: ExtractedPolicies = new Map();

  return {
    ...(extractMetaCSPOptions.enabled && {
      // Frameworks such as SvelteKit build the environments in their own buildApp hook and write prerendered HTML in a post buildApp hook, after closeBundle has already run. Extraction skips policies it has already written, so running it in both hooks is harmless.
      buildApp: {
        async handler(builder: ViteBuilder): Promise<void> {
          // If no environment has been built yet, Vite builds them after all buildApp hooks and closeBundle handles extraction
          if (
            Object.values(builder.environments).every(
              (environment) => environment?.isBuilt !== true,
            )
          ) {
            return;
          }
          const { config } = builder.environments["client"] ?? builder;
          await extractMetaCSP(
            this,
            extractMetaCSPOptions,
            resolve(config.root, config.build.outDir),
            options.fileName,
            extractedPolicies,
          );
        },
        order: "post",
      },
      closeBundle: {
        async handler(): Promise<void> {
          await extractMetaCSP(
            this,
            extractMetaCSPOptions,
            rollupOutputOptions?.dir,
            options.fileName,
            extractedPolicies,
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
      // If this hook is running, we are about to emit a new htaccess file.
      extractedPolicies.delete(
        htaccessFilePath(outputOptions.dir, options.fileName),
      );
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
