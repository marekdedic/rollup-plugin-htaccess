import { compileRollup, compileVite } from "./utils";

test("Basic run test", async () => {
  expect.assertions(2);
  await expect(compileRollup()).resolves.toBe("");
  await expect(compileVite()).resolves.toBe("");
});

test("Overriden output location", async () => {
  expect.assertions(2);
  const args = [
    {
      fileName: "other.txt",
    },
    "other.txt",
  ] as const;
  await expect(compileRollup(...args)).resolves.toBe("");
  await expect(compileVite(...args)).resolves.toBe("");
});

test("Template", async () => {
  expect.assertions(2);
  const options = {
    template: "__tests__/fixtures/template.txt",
  };
  const output =
    "HTACCESS template\nThese isn't even valid .htacccess file\n# Comment";
  await expect(compileRollup(options)).resolves.toBe(output);
  await expect(compileVite(options)).resolves.toBe(output);
});

test("Vite root", async () => {
  expect.assertions(1);
  const htaccess = await compileVite(
    {
      template: "fixtures/template.txt",
    },
    ".htaccess",
    { root: "__tests__" },
  );
  expect(htaccess).toBe(
    "HTACCESS template\nThese isn't even valid .htacccess file\n# Comment",
  );
});
