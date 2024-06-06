import { type OutputAsset, rollup } from "rollup";

import htaccess, { type Options } from "../src";

export async function compileRollup(
  options?: Partial<Options>,
): Promise<string> {
  const bundle = await rollup({
    input: "__tests__/fixtures/dummy.js",
    plugins: [htaccess(options)],
  });
  const { output } = await bundle.generate({});
  const htaccessFiles = output.filter(
    (file): file is OutputAsset =>
      file.type === "asset" && file.fileName === ".htaccess",
  );
  expect(htaccessFiles).toHaveLength(1);
  return htaccessFiles[0].source.toString();
}
