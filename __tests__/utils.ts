import assert from "assert";
import {
  type OutputAsset,
  rollup,
  type RollupOptions,
  type RollupOutput,
} from "rollup";
import type { InlineConfig as ViteOptions } from "vite";
import { build } from "vite";

import htaccess, { type Options } from "../src";

function extractFileContents(output: RollupOutput, fileName: string): string {
  const htaccessFiles = output.output.filter(
    (file): file is OutputAsset =>
      file.type === "asset" && file.fileName === fileName,
  );
  assert(htaccessFiles.length === 1);
  return htaccessFiles[0].source.toString().trim();
}

export interface CompileOptions {
  fileName?: string;
  write?: boolean;
  bundlerOptions?: RollupOptions & ViteOptions;
}

export async function compileRollup(
  pluginOptions: Partial<Options>,
  compileOptions: CompileOptions = {},
): Promise<string> {
  const bundle = await rollup({
    input: "__tests__/fixtures/dummy.js",
    plugins: [htaccess(pluginOptions)],
    ...compileOptions.bundlerOptions,
  });
  const output = await bundle.generate({});
  const fileContents = extractFileContents(
    output,
    compileOptions.fileName ?? ".htaccess",
  );
  if (compileOptions.write === true) {
    await bundle.write({ dir: "__tests__/dist-rollup" });
  }
  await bundle.close();
  return fileContents;
}

export async function compileVite(
  pluginOptions: Partial<Options>,
  compileOptions: CompileOptions = {},
): Promise<string> {
  const output = (await build({
    logLevel: "warn",
    build: {
      rollupOptions: {
        input: {
          app: "__tests__/fixtures/dummy.html",
        },
      },
      outDir: "__tests__/dist-vite",
      write: compileOptions.write ?? false,
    },
    plugins: [htaccess(pluginOptions)],
    ...compileOptions.bundlerOptions,
  })) as Array<RollupOutput> | RollupOutput;
  return extractFileContents(
    Array.isArray(output) ? output[0] : output,
    compileOptions.fileName ?? ".htaccess",
  );
}
