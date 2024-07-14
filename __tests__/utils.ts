import assert from "assert";
import {
  type OutputAsset,
  rollup,
  type RollupOptions,
  type RollupOutput,
} from "rollup";
import type { InlineConfig } from "vite";
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

export async function compileRollup(
  options?: Partial<Options>,
  fileName = ".htaccess",
  rollupOptions: RollupOptions = {},
): Promise<string> {
  const bundle = await rollup({
    input: "__tests__/fixtures/dummy.js",
    plugins: [htaccess(options)],
    ...rollupOptions,
  });
  const output = await bundle.generate({});
  const fileContents = extractFileContents(output, fileName);
  await bundle.close();
  return fileContents;
}

export async function compileVite(
  options?: Partial<Options>,
  fileName = ".htaccess",
  viteOptions: InlineConfig = {},
): Promise<string> {
  const output = (await build({
    logLevel: "warn",
    build: {
      rollupOptions: {
        input: {
          app: "__tests__/fixtures/dummy.html",
        },
      },
      write: false,
    },
    plugins: [htaccess(options)],
    ...viteOptions,
  })) as Array<RollupOutput> | RollupOutput;
  return extractFileContents(
    Array.isArray(output) ? output[0] : output,
    fileName,
  );
}
