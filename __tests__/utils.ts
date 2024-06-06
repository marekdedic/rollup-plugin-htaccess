import assert from "assert";
import { type OutputAsset, rollup, type RollupOutput } from "rollup";
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
): Promise<string> {
  const bundle = await rollup({
    input: "__tests__/fixtures/dummy.js",
    plugins: [htaccess(options)],
  });
  const output = await bundle.generate({});
  return extractFileContents(output, fileName);
}

export async function compileVite(
  options?: Partial<Options>,
  fileName = ".htaccess",
): Promise<string> {
  const output = (await build({
    logLevel: "warn",
    build: {
      rollupOptions: {
        input: {
          app: "__tests__/fixtures/dummy.html",
        },
      },
    },
    plugins: [htaccess(options)],
  })) as Array<RollupOutput> | RollupOutput;
  return extractFileContents(
    Array.isArray(output) ? output[0] : output,
    fileName,
  );
}
