import { expect, test } from "vitest";

import { compileRollup, compileVite } from "./utils";

test("Template", async () => {
  expect.assertions(2);

  const options = {
    template: "tests/fixtures/template.txt",
  };
  const output =
    "HTACCESS template\nThese isn't even valid .htacccess file\n# Comment";

  await expect(compileRollup(options)).resolves.toBe(output);
  await expect(compileVite(options)).resolves.toBe(output);
});

test("Nonexistent template", async () => {
  expect.assertions(2);

  const options = {
    template: "tests/fixtures/wrong-template.txt",
  };
  const errorMessage =
    "Could not read rollup-plugin-htaccess template file, Error: ";

  await expect(compileRollup(options)).rejects.toThrow(errorMessage);
  await expect(compileVite(options)).rejects.toThrow(errorMessage);
});
