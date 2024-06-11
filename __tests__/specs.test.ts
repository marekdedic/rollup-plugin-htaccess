import { readdirSync, readFileSync } from "fs";
import { join } from "path";

import type { Options } from "../src";
import { compileRollup, compileVite } from "./utils";

function listDir(path: string): [Array<string>, Array<string>] {
  const files = readdirSync(path, { withFileTypes: true });
  const dirs = files
    .filter((file) => file.isDirectory())
    .map((file) => join(path, file.name));
  const specs = files
    .filter((file) => file.isFile() && file.name.endsWith("-options.ts"))
    .map((file) => join(path, file.name));
  return [dirs, specs];
}

function listSpecs(): Array<string> {
  const [dirs, specs] = listDir("__tests__/specs");
  while (dirs.length > 0) {
    const dir = dirs.pop()!;
    const [newDirs, newSpecs] = listDir(dir);
    dirs.push(...newDirs);
    specs.push(...newSpecs);
  }
  return specs.map((spec) =>
    spec.replace(/^__tests__\/specs\//, "").replace(/-options\.ts$/, ""),
  );
}

async function loadOptions(spec: string): Promise<Options> {
  return (
    (await import("./specs/" + spec + "-options.ts")) as {
      default: Options;
    }
  ).default;
}

function loadOutput(spec: string): string {
  return readFileSync("__tests__/specs/" + spec + "-output.txt", "utf8").trim();
}

describe("Spec tests", () => {
  test.each(listSpecs())("Spec %s", async (spec) => {
    expect.assertions(2);

    const options = await loadOptions(spec);
    const output = loadOutput(spec);

    await expect(compileRollup(options)).resolves.toBe(output);
    await expect(compileVite(options)).resolves.toBe(output);
  });
});
