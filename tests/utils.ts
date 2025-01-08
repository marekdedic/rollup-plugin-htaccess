import assert from "assert";
import { type Dirent, readdirSync as nodeReaddir } from "fs";
import {
  type OutputAsset,
  rollup,
  type RollupOptions,
  type RollupOutput,
} from "rollup";
import { build, type InlineConfig as ViteOptions } from "vite";

import htaccess, { type Options } from "../src";

export interface CompileOptions {
  bundlerOptions?: RollupOptions & ViteOptions;
  fileName?: string;
  write?: boolean;
}

type Directory = Pick<Dirent, "isDirectory" | "isFile" | "name">;

export async function compileRollup(
  pluginOptions: Partial<Options>,
  compileOptions: CompileOptions = {},
): Promise<string> {
  const bundle = await rollup({
    input: "tests/fixtures/dummy.js",
    plugins: [htaccess(pluginOptions)],
    ...compileOptions.bundlerOptions,
  });
  const output = await bundle.generate({});
  const fileContents = extractFileContents(
    output,
    compileOptions.fileName ?? ".htaccess",
  );
  if (compileOptions.write === true) {
    await bundle.write({ dir: "tests/dist-rollup" });
  }
  await bundle.close();
  return fileContents;
}

export async function compileVite(
  pluginOptions: Partial<Options>,
  compileOptions: CompileOptions = {},
): Promise<string> {
  const output = (await build({
    build: {
      outDir: "tests/dist-vite",
      rollupOptions: {
        input: {
          app: "tests/fixtures/dummy.html",
        },
      },
      write: compileOptions.write ?? false,
    },
    logLevel: "warn",
    plugins: [htaccess(pluginOptions)],
    ...compileOptions.bundlerOptions,
  })) as Array<RollupOutput> | RollupOutput;
  return extractFileContents(
    Array.isArray(output) ? output[0] : output,
    compileOptions.fileName ?? ".htaccess",
  );
}

export function readDirSync(path: string): Array<Directory> {
  return nodeReaddir(path, { withFileTypes: true });
}

function extractFileContents(output: RollupOutput, fileName: string): string {
  const htaccessFiles = output.output.filter(
    (file): file is OutputAsset =>
      file.type === "asset" && file.fileName === fileName,
  );
  assert(htaccessFiles.length === 1);
  return htaccessFiles[0].source.toString().trim();
}
