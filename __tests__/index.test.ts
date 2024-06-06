import { compileRollup, compileVite } from "./utils";

test.each([compileRollup, compileVite])("Basic run test", async (compile) => {
  expect.assertions(1);
  const htaccess = await compile();
  expect(htaccess).toBe("");
});

test.each([compileRollup, compileVite])(
  "Overriden output location",
  async (compile) => {
    expect.assertions(1);
    const htaccess = await compile(
      {
        fileName: "other.txt",
      },
      "other.txt",
    );
    expect(htaccess).toBe("");
  },
);

test.each([compileRollup, compileVite])("Template", async (compile) => {
  expect.assertions(1);
  const htaccess = await compile({
    template: "__tests__/fixtures/template.txt",
  });
  expect(htaccess).toBe(
    "HTACCESS template\nThese isn't even valid .htacccess file\n# Comment",
  );
});
