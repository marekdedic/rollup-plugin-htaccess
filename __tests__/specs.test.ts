import { jest } from "@jest/globals";
import { join } from "path";

import type { Options } from "../src";

import { readFile } from "../src/utils";
import { compileRollup, compileVite, readDirSync } from "./utils";

function getSpecPrefix(): string | null {
  const ind = process.argv.findIndex((value) =>
    value.endsWith("/specs.test.ts"),
  );
  if (ind < 0 || process.argv.length <= ind + 1) {
    return null;
  }
  return process.argv[ind + 1];
}

function listDir(path: string): [Array<string>, Array<string>] {
  const files = readDirSync(path);
  const dirs = files
    .filter((file) => file.isDirectory())
    .map((file) => join(path, file.name));
  const specs = files
    .filter((file) => file.isFile() && file.name.endsWith("-options.ts"))
    .map((file) => join(path, file.name));
  return [dirs, specs];
}

function listSpecs(prefix: string | null): Array<string> {
  const [dirs, specs] = listDir(prefix ?? "__tests__/specs");
  while (dirs.length > 0) {
    const dir = dirs.pop();
    if (dir === undefined) {
      continue;
    }
    const [newDirs, newSpecs] = listDir(dir);
    dirs.push(...newDirs);
    specs.push(...newSpecs);
  }
  return specs.map((spec) =>
    spec.replace(/^__tests__\/specs\//u, "").replace(/-options\.ts$/u, ""),
  );
}

async function loadOptions(spec: string): Promise<Options> {
  return (
    (await import(`./specs/${spec}-options.ts`)) as {
      default: Options;
    }
  ).default;
}

async function loadOutput(spec: string): Promise<string | null> {
  try {
    return (await readFile(`__tests__/specs/${spec}-output.txt`)).trim();
  } catch {
    return null;
  }
}

async function loadError(spec: string): Promise<string> {
  return (await readFile(`__tests__/specs/${spec}-error.txt`)).trim();
}

describe("Spec tests", () => {
  test.each(listSpecs(getSpecPrefix()))("Spec %s", async (spec) => {
    expect.assertions(2);

    const options = await loadOptions(spec);
    const output = await loadOutput(spec);

    /* eslint-disable jest/no-conditional-in-test -- Conditionals used to load errors */
    if (output !== null) {
      await expect(compileRollup(options)).resolves.toBe(output);
      await expect(compileVite(options)).resolves.toBe(output);
    } else {
      const error = await loadError(spec);
      // eslint-disable-next-line @typescript-eslint/no-empty-function -- The empty function is the point
      jest.spyOn(global.console, "error").mockImplementation(() => {});

      await expect(compileRollup(options)).rejects.toThrow(error);
      await expect(compileVite(options)).rejects.toThrow(error);
    }
    /* eslint-enable */
  });
});
