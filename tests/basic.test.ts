import { expect, test } from "vitest";

import { compileRollup, compileVite } from "./utils";

test("Basic run test", async () => {
  expect.assertions(2);
  await expect(compileRollup({})).resolves.toBe("");
  await expect(compileVite({})).resolves.toBe("");
});

test("Overriden output location", async () => {
  expect.assertions(2);

  const pluginOptions = {
    fileName: "other.txt",
  };
  const compileOptions = {
    fileName: "other.txt",
  };

  await expect(compileRollup(pluginOptions, compileOptions)).resolves.toBe("");
  await expect(compileVite(pluginOptions, compileOptions)).resolves.toBe("");
});

test("Vite root", async () => {
  expect.assertions(1);

  const htaccess = await compileVite(
    {},
    {
      bundlerOptions: { root: "tests" },
      fileName: ".htaccess",
    },
  );

  expect(htaccess).toBe("");
});
