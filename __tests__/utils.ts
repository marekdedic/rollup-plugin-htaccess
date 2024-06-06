import { type OutputAsset, rollup, type RollupOutput } from "rollup";
import { build } from "vite";

import htaccess, { type Options } from "../src";

function extractFileContents(output: RollupOutput): string {
  const htaccessFiles = output.output.filter(
    (file): file is OutputAsset =>
      file.type === "asset" && file.fileName === ".htaccess",
  );
  expect(htaccessFiles).toHaveLength(1);
  return htaccessFiles[0].source.toString();
}

export async function compileRollup(
  options?: Partial<Options>,
): Promise<string> {
  const bundle = await rollup({
    input: "__tests__/fixtures/dummy.js",
    plugins: [htaccess(options)],
  });
  const output = await bundle.generate({});
  return extractFileContents(output);
}

export async function compileVite(options?: Partial<Options>): Promise<string> {
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
  return extractFileContents(Array.isArray(output) ? output[0] : output);
}
