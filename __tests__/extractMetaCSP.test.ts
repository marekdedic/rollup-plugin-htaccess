import { join } from "path";
import { rimraf } from "rimraf";

import htaccess, { type Options } from "../src";
import { readFile } from "../src/utils";
import { type CompileOptions, compileRollup, compileVite } from "./utils";

beforeEach(async () => {
  await rimraf("__tests__/dist-rollup");
  await rimraf("__tests__/dist-vite");
});

test("Basic CSP extraction", async () => {
  expect.assertions(2);
  function configGenerator(
    distFolder: string,
  ): [Partial<Options>, CompileOptions] {
    const pluginOptions = {
      extractMetaCSP: {
        enabled: true,
        files: [join("__tests__", distFolder, "index.html")],
      },
    };
    const compileOptions: CompileOptions = {
      write: true,
      bundlerOptions: {
        plugins: [
          htaccess(pluginOptions),
          {
            name: "Emit index.html",
            generateBundle(): void {
              this.emitFile({
                type: "asset",
                fileName: "index.html",
                source:
                  '<!DOCTYPE html><html><head><meta http-equiv="content-security-policy" content="CSP-value"></head><body></body></html>',
              });
            },
          },
        ],
      },
    };
    return [pluginOptions, compileOptions];
  }
  const output = 'Header always set Content-Security-Policy "CSP-value"';
  await compileRollup(...configGenerator("dist-rollup"));
  expect((await readFile("__tests__/dist-rollup/.htaccess")).trim()).toBe(
    output,
  );
  await compileVite(...configGenerator("dist-vite"));
  expect((await readFile("__tests__/dist-rollup/.htaccess")).trim()).toBe(
    output,
  );
});

test("CSP extraction disabled", async () => {
  expect.assertions(2);
  const pluginOptions = {
    extractMetaCSP: {
      enabled: false as const,
    },
  };
  const compileOptions: CompileOptions = {
    write: true,
    bundlerOptions: {
      plugins: [
        htaccess(pluginOptions),
        {
          name: "Emit index.html",
          generateBundle(): void {
            this.emitFile({
              type: "asset",
              fileName: "index.html",
              source:
                '<!DOCTYPE html><html><head><meta http-equiv="content-security-policy" content="CSP-value"></head><body></body></html>',
            });
          },
        },
      ],
    },
  };
  const output = "";
  await compileRollup(pluginOptions, compileOptions);
  expect((await readFile("__tests__/dist-rollup/.htaccess")).trim()).toBe(
    output,
  );
  await compileVite(pluginOptions, compileOptions);
  expect((await readFile("__tests__/dist-rollup/.htaccess")).trim()).toBe(
    output,
  );
});

test("CSP extraction with custom .htaccess", async () => {
  expect.assertions(2);
  function configGenerator(
    distFolder: string,
  ): [Partial<Options>, CompileOptions] {
    const pluginOptions = {
      fileName: "custom.txt",
      extractMetaCSP: {
        enabled: true,
        htaccessFile: join("__tests__", distFolder, "custom.txt"),
        files: [join("__tests__", distFolder, "index.html")],
      },
    };
    const compileOptions: CompileOptions = {
      fileName: "custom.txt",
      write: true,
      bundlerOptions: {
        plugins: [
          htaccess(pluginOptions),
          {
            name: "Emit index.html",
            generateBundle(): void {
              this.emitFile({
                type: "asset",
                fileName: "index.html",
                source:
                  '<!DOCTYPE html><html><head><meta http-equiv="content-security-policy" content="CSP-value"></head><body></body></html>',
              });
            },
          },
        ],
      },
    };
    return [pluginOptions, compileOptions];
  }
  const output = 'Header always set Content-Security-Policy "CSP-value"';
  await compileRollup(...configGenerator("dist-rollup"));
  expect((await readFile("__tests__/dist-rollup/custom.txt")).trim()).toBe(
    output,
  );
  await compileVite(...configGenerator("dist-vite"));
  expect((await readFile("__tests__/dist-rollup/custom.txt")).trim()).toBe(
    output,
  );
});

test("CSP extraction with non-existent HTML file", async () => {
  expect.assertions(2);
  function configGenerator(
    distFolder: string,
  ): [Partial<Options>, CompileOptions] {
    const pluginOptions = {
      extractMetaCSP: {
        enabled: true,
        files: [join("__tests__", distFolder, "incorrect.html")],
      },
    };
    const compileOptions: CompileOptions = {
      write: true,
      bundlerOptions: {
        plugins: [
          htaccess(pluginOptions),
          {
            name: "Emit index.html",
            generateBundle(): void {
              this.emitFile({
                type: "asset",
                fileName: "index.html",
                source:
                  '<!DOCTYPE html><html><head><meta http-equiv="content-security-policy" content="CSP-value"></head><body></body></html>',
              });
            },
          },
        ],
      },
    };
    return [pluginOptions, compileOptions];
  }
  const output = "";
  await compileRollup(...configGenerator("dist-rollup"));
  expect((await readFile("__tests__/dist-rollup/.htaccess")).trim()).toBe(
    output,
  );
  await compileVite(...configGenerator("dist-vite"));
  expect((await readFile("__tests__/dist-rollup/.htaccess")).trim()).toBe(
    output,
  );
});

test("CSP extraction with no valid meta tags", async () => {
  expect.assertions(2);
  function configGenerator(
    distFolder: string,
  ): [Partial<Options>, CompileOptions] {
    const pluginOptions = {
      extractMetaCSP: {
        enabled: true,
        files: [join("__tests__", distFolder, "index.html")],
      },
    };
    const compileOptions: CompileOptions = {
      write: true,
      bundlerOptions: {
        plugins: [
          htaccess(pluginOptions),
          {
            name: "Emit index.html",
            generateBundle(): void {
              this.emitFile({
                type: "asset",
                fileName: "index.html",
                source:
                  '<!DOCTYPE html><html><head><meta http-equiv="incorrect-content-security-policy" content="CSP-value"></head><body></body></html>',
              });
            },
          },
        ],
      },
    };
    return [pluginOptions, compileOptions];
  }
  const output = "";
  await compileRollup(...configGenerator("dist-rollup"));
  expect((await readFile("__tests__/dist-rollup/.htaccess")).trim()).toBe(
    output,
  );
  await compileVite(...configGenerator("dist-vite"));
  expect((await readFile("__tests__/dist-rollup/.htaccess")).trim()).toBe(
    output,
  );
});

test("CSP extraction with incorrect .htaccess", async () => {
  expect.assertions(2);
  function configGenerator(
    distFolder: string,
  ): [Partial<Options>, CompileOptions] {
    const pluginOptions = {
      fileName: "custom.txt",
      extractMetaCSP: {
        enabled: true,
        htaccessFile: "incorrect.txt",
        files: [join("__tests__", distFolder, "index.html")],
      },
    };
    const compileOptions: CompileOptions = {
      fileName: "custom.txt",
      write: true,
      bundlerOptions: {
        plugins: [
          htaccess(pluginOptions),
          {
            name: "Emit index.html",
            generateBundle(): void {
              this.emitFile({
                type: "asset",
                fileName: "index.html",
                source:
                  '<!DOCTYPE html><html><head><meta http-equiv="content-security-policy" content="CSP-value"></head><body></body></html>',
              });
            },
          },
        ],
      },
    };
    return [pluginOptions, compileOptions];
  }
  await expect(
    compileRollup(...configGenerator("dist-rollup")),
  ).rejects.toThrow('Could not read htaccess file at path "incorrect.txt".');
  await expect(compileVite(...configGenerator("dist-vite"))).rejects.toThrow(
    'Could not read htaccess file at path "incorrect.txt".',
  );
});

test("CSP extraction with conflicting directives", async () => {
  expect.assertions(2);
  function configGenerator(
    distFolder: string,
  ): [Partial<Options>, CompileOptions] {
    const pluginOptions = {
      extractMetaCSP: {
        enabled: true,
        files: [
          join("__tests__", distFolder, "index.html"),
          join("__tests__", distFolder, "file2.html"),
        ],
      },
    };
    const compileOptions: CompileOptions = {
      write: true,
      bundlerOptions: {
        plugins: [
          htaccess(pluginOptions),
          {
            name: "Emit index.html",
            generateBundle(): void {
              this.emitFile({
                type: "asset",
                fileName: "index.html",
                source:
                  '<!DOCTYPE html><html><head><meta http-equiv="content-security-policy" content="CSP-value"></head><body></body></html>',
              });
              this.emitFile({
                type: "asset",
                fileName: "file2.html",
                source:
                  '<!DOCTYPE html><html><head><meta http-equiv="content-security-policy" content="CSP-different-value"></head><body></body></html>',
              });
            },
          },
        ],
      },
    };
    return [pluginOptions, compileOptions];
  }
  await expect(
    compileRollup(...configGenerator("dist-rollup")),
  ).rejects.toThrow(
    "Found multiple conflicting CSP directives when extracting from meta tags.",
  );
  await expect(compileVite(...configGenerator("dist-vite"))).rejects.toThrow(
    "Found multiple conflicting CSP directives when extracting from meta tags.",
  );
});

test("CSP meta element case sensitivity", async () => {
  expect.assertions(2);
  function configGenerator(
    distFolder: string,
  ): [Partial<Options>, CompileOptions] {
    const pluginOptions = {
      extractMetaCSP: {
        enabled: true,
        files: [join("__tests__", distFolder, "index.html")],
      },
    };
    const compileOptions: CompileOptions = {
      write: true,
      bundlerOptions: {
        plugins: [
          htaccess(pluginOptions),
          {
            name: "Emit index.html",
            generateBundle(): void {
              this.emitFile({
                type: "asset",
                fileName: "index.html",
                source:
                  '<!DOCTYPE html><html><head><meta http-equiv="Content-Security-Policy" content="CSP-value"></head><body></body></html>',
              });
            },
          },
        ],
      },
    };
    return [pluginOptions, compileOptions];
  }
  const output = 'Header always set Content-Security-Policy "CSP-value"';
  await compileRollup(...configGenerator("dist-rollup"));
  expect((await readFile("__tests__/dist-rollup/.htaccess")).trim()).toBe(
    output,
  );
  await compileVite(...configGenerator("dist-vite"));
  expect((await readFile("__tests__/dist-rollup/.htaccess")).trim()).toBe(
    output,
  );
});

test("CSP extraction with other meta tags", async () => {
  expect.assertions(2);
  function configGenerator(
    distFolder: string,
  ): [Partial<Options>, CompileOptions] {
    const pluginOptions = {
      extractMetaCSP: {
        enabled: true,
        files: [join("__tests__", distFolder, "index.html")],
      },
    };
    const compileOptions: CompileOptions = {
      write: true,
      bundlerOptions: {
        plugins: [
          htaccess(pluginOptions),
          {
            name: "Emit index.html",
            generateBundle(): void {
              this.emitFile({
                type: "asset",
                fileName: "index.html",
                source:
                  '<!DOCTYPE html><html><head><meta charset="utf-8" /><meta http-equiv="content-security-policy" content="CSP-value"></head><body></body></html>',
              });
            },
          },
        ],
      },
    };
    return [pluginOptions, compileOptions];
  }
  const output = 'Header always set Content-Security-Policy "CSP-value"';
  await compileRollup(...configGenerator("dist-rollup"));
  expect((await readFile("__tests__/dist-rollup/.htaccess")).trim()).toBe(
    output,
  );
  await compileVite(...configGenerator("dist-vite"));
  expect((await readFile("__tests__/dist-rollup/.htaccess")).trim()).toBe(
    output,
  );
});
