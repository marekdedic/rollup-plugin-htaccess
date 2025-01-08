import { jest } from "@jest/globals";
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
    const pluginOptions: Partial<Options> = {
      extractMetaCSP: {
        defaultPolicyFile: join("__tests__", distFolder, "index.html"),
        enabled: true,
      },
    };
    const compileOptions: CompileOptions = {
      bundlerOptions: {
        plugins: [
          htaccess(pluginOptions),
          {
            generateBundle(): void {
              this.emitFile({
                fileName: "index.html",
                source:
                  '<!DOCTYPE html><html><head><meta http-equiv="content-security-policy" content="CSP-value"></head><body></body></html>',
                type: "asset",
              });
            },
            name: "Emit index.html",
          },
        ],
      },
      write: true,
    };
    return [pluginOptions, compileOptions];
  }
  const output = 'Header always set Content-Security-Policy "CSP-value"';
  await compileRollup(...configGenerator("dist-rollup"));

  expect((await readFile("__tests__/dist-rollup/.htaccess")).trim()).toBe(
    output,
  );

  await compileVite(...configGenerator("dist-vite"));

  expect((await readFile("__tests__/dist-vite/.htaccess")).trim()).toBe(output);
});

test("CSP extraction disabled", async () => {
  expect.assertions(2);

  const pluginOptions = {
    extractMetaCSP: {
      enabled: false as const,
    },
  };
  const compileOptions: CompileOptions = {
    bundlerOptions: {
      plugins: [
        htaccess(pluginOptions),
        {
          generateBundle(): void {
            this.emitFile({
              fileName: "index.html",
              source:
                '<!DOCTYPE html><html><head><meta http-equiv="content-security-policy" content="CSP-value"></head><body></body></html>',
              type: "asset",
            });
          },
          name: "Emit index.html",
        },
      ],
    },
    write: true,
  };
  const output = "";
  await compileRollup(pluginOptions, compileOptions);

  expect((await readFile("__tests__/dist-rollup/.htaccess")).trim()).toBe(
    output,
  );

  await compileVite(pluginOptions, compileOptions);

  expect((await readFile("__tests__/dist-vite/.htaccess")).trim()).toBe(output);
});

test("CSP extraction with custom .htaccess", async () => {
  expect.assertions(2);

  function configGenerator(
    distFolder: string,
  ): [Partial<Options>, CompileOptions] {
    const pluginOptions: Partial<Options> = {
      extractMetaCSP: {
        defaultPolicyFile: join("__tests__", distFolder, "index.html"),
        enabled: true,
        htaccessFile: join("__tests__", distFolder, "custom.txt"),
      },
      fileName: "custom.txt",
    };
    const compileOptions: CompileOptions = {
      bundlerOptions: {
        plugins: [
          htaccess(pluginOptions),
          {
            generateBundle(): void {
              this.emitFile({
                fileName: "index.html",
                source:
                  '<!DOCTYPE html><html><head><meta http-equiv="content-security-policy" content="CSP-value"></head><body></body></html>',
                type: "asset",
              });
            },
            name: "Emit index.html",
          },
        ],
      },
      fileName: "custom.txt",
      write: true,
    };
    return [pluginOptions, compileOptions];
  }
  const output = 'Header always set Content-Security-Policy "CSP-value"';
  await compileRollup(...configGenerator("dist-rollup"));

  expect((await readFile("__tests__/dist-rollup/custom.txt")).trim()).toBe(
    output,
  );

  await compileVite(...configGenerator("dist-vite"));

  expect((await readFile("__tests__/dist-vite/custom.txt")).trim()).toBe(
    output,
  );
});

test("CSP extraction with non-existent HTML file", async () => {
  expect.assertions(2);

  function configGenerator(
    distFolder: string,
  ): [Partial<Options>, CompileOptions] {
    const pluginOptions: Partial<Options> = {
      extractMetaCSP: {
        defaultPolicyFile: join("__tests__", distFolder, "incorrect.html"),
        enabled: true,
      },
    };
    const compileOptions: CompileOptions = {
      bundlerOptions: {
        plugins: [
          htaccess(pluginOptions),
          {
            generateBundle(): void {
              this.emitFile({
                fileName: "index.html",
                source:
                  '<!DOCTYPE html><html><head><meta http-equiv="content-security-policy" content="CSP-value"></head><body></body></html>',
                type: "asset",
              });
            },
            name: "Emit index.html",
          },
        ],
      },
      write: true,
    };
    return [pluginOptions, compileOptions];
  }
  const output = "";
  await compileRollup(...configGenerator("dist-rollup"));

  expect((await readFile("__tests__/dist-rollup/.htaccess")).trim()).toBe(
    output,
  );

  await compileVite(...configGenerator("dist-vite"));

  expect((await readFile("__tests__/dist-vite/.htaccess")).trim()).toBe(output);
});

test("CSP extraction with no valid meta tags", async () => {
  expect.assertions(2);

  function configGenerator(
    distFolder: string,
  ): [Partial<Options>, CompileOptions] {
    const pluginOptions: Partial<Options> = {
      extractMetaCSP: {
        defaultPolicyFile: join("__tests__", distFolder, "index.html"),
        enabled: true,
      },
    };
    const compileOptions: CompileOptions = {
      bundlerOptions: {
        plugins: [
          htaccess(pluginOptions),
          {
            generateBundle(): void {
              this.emitFile({
                fileName: "index.html",
                source:
                  '<!DOCTYPE html><html><head><meta http-equiv="incorrect-content-security-policy" content="CSP-value"></head><body></body></html>',
                type: "asset",
              });
            },
            name: "Emit index.html",
          },
        ],
      },
      write: true,
    };
    return [pluginOptions, compileOptions];
  }
  const output = "";
  await compileRollup(...configGenerator("dist-rollup"));

  expect((await readFile("__tests__/dist-rollup/.htaccess")).trim()).toBe(
    output,
  );

  await compileVite(...configGenerator("dist-vite"));

  expect((await readFile("__tests__/dist-vite/.htaccess")).trim()).toBe(output);
});

test("CSP extraction with non-existent .htaccess", async () => {
  expect.assertions(8);

  function configGenerator(
    distFolder: string,
  ): [Partial<Options>, CompileOptions] {
    const pluginOptions: Partial<Options> = {
      extractMetaCSP: {
        defaultPolicyFile: join("__tests__", distFolder, "index.html"),
        enabled: true,
        htaccessFile: join("__tests__", distFolder, "other.txt"),
      },
      fileName: "custom.txt",
    };
    const compileOptions: CompileOptions = {
      bundlerOptions: {
        plugins: [
          htaccess(pluginOptions),
          {
            generateBundle(): void {
              this.emitFile({
                fileName: "index.html",
                source:
                  '<!DOCTYPE html><html><head><meta http-equiv="content-security-policy" content="CSP-value"></head><body></body></html>',
                type: "asset",
              });
            },
            name: "Emit index.html",
          },
        ],
      },
      fileName: "custom.txt",
      write: true,
    };
    return [pluginOptions, compileOptions];
  }
  const output = "";
  const otherOutput = 'Header always set Content-Security-Policy "CSP-value"';

  const consoleWarn = jest
    .spyOn(global.console, "warn")
    // eslint-disable-next-line @typescript-eslint/no-empty-function -- The empty function is the point
    .mockImplementation(() => {});
  await compileRollup(...configGenerator("dist-rollup"));

  expect(consoleWarn).toHaveBeenCalledTimes(1);
  expect(consoleWarn.mock.calls[0][0]).toContain(
    'Could not read htaccess file at path "__tests__/dist-rollup/other.txt", writing extracted CSP to new file.',
  );
  expect((await readFile("__tests__/dist-rollup/custom.txt")).trim()).toBe(
    output,
  );
  expect((await readFile("__tests__/dist-rollup/other.txt")).trim()).toBe(
    otherOutput,
  );

  await compileVite(...configGenerator("dist-vite"));

  expect(consoleWarn).toHaveBeenCalledTimes(2);
  expect(consoleWarn.mock.calls[1][0]).toContain(
    'Could not read htaccess file at path "__tests__/dist-vite/other.txt", writing extracted CSP to new file.',
  );
  expect((await readFile("__tests__/dist-vite/custom.txt")).trim()).toBe(
    output,
  );
  expect((await readFile("__tests__/dist-vite/other.txt")).trim()).toBe(
    otherOutput,
  );
});

test("CSP extraction with conflicting directives", async () => {
  expect.assertions(2);

  function configGenerator(
    distFolder: string,
  ): [Partial<Options>, CompileOptions] {
    const pluginOptions: Partial<Options> = {
      extractMetaCSP: {
        defaultPolicyFile: join("__tests__", distFolder, "index.html"),
        enabled: true,
      },
    };
    const compileOptions: CompileOptions = {
      bundlerOptions: {
        plugins: [
          htaccess(pluginOptions),
          {
            generateBundle(): void {
              this.emitFile({
                fileName: "index.html",
                source:
                  '<!DOCTYPE html><html><head><meta http-equiv="content-security-policy" content="CSP-value"><meta http-equiv="content-security-policy" content="CSP-different-value"></head><body></body></html>',
                type: "asset",
              });
            },
            name: "Emit index.html",
          },
        ],
      },
      write: true,
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
    const pluginOptions: Partial<Options> = {
      extractMetaCSP: {
        defaultPolicyFile: join("__tests__", distFolder, "index.html"),
        enabled: true,
      },
    };
    const compileOptions: CompileOptions = {
      bundlerOptions: {
        plugins: [
          htaccess(pluginOptions),
          {
            generateBundle(): void {
              this.emitFile({
                fileName: "index.html",
                source:
                  '<!DOCTYPE html><html><head><meta http-equiv="Content-Security-Policy" content="CSP-value"></head><body></body></html>',
                type: "asset",
              });
            },
            name: "Emit index.html",
          },
        ],
      },
      write: true,
    };
    return [pluginOptions, compileOptions];
  }
  const output = 'Header always set Content-Security-Policy "CSP-value"';
  await compileRollup(...configGenerator("dist-rollup"));

  expect((await readFile("__tests__/dist-rollup/.htaccess")).trim()).toBe(
    output,
  );

  await compileVite(...configGenerator("dist-vite"));

  expect((await readFile("__tests__/dist-vite/.htaccess")).trim()).toBe(output);
});

test("CSP extraction with other meta tags", async () => {
  expect.assertions(2);

  function configGenerator(
    distFolder: string,
  ): [Partial<Options>, CompileOptions] {
    const pluginOptions: Partial<Options> = {
      extractMetaCSP: {
        defaultPolicyFile: join("__tests__", distFolder, "index.html"),
        enabled: true,
      },
    };
    const compileOptions: CompileOptions = {
      bundlerOptions: {
        plugins: [
          htaccess(pluginOptions),
          {
            generateBundle(): void {
              this.emitFile({
                fileName: "index.html",
                source:
                  '<!DOCTYPE html><html><head><meta charset="utf-8" /><meta http-equiv="content-security-policy" content="CSP-value"></head><body></body></html>',
                type: "asset",
              });
            },
            name: "Emit index.html",
          },
        ],
      },
      write: true,
    };
    return [pluginOptions, compileOptions];
  }
  const output = 'Header always set Content-Security-Policy "CSP-value"';
  await compileRollup(...configGenerator("dist-rollup"));

  expect((await readFile("__tests__/dist-rollup/.htaccess")).trim()).toBe(
    output,
  );

  await compileVite(...configGenerator("dist-vite"));

  expect((await readFile("__tests__/dist-vite/.htaccess")).trim()).toBe(output);
});

test("CSP extraction with per-file policies", async () => {
  expect.assertions(2);

  function configGenerator(
    distFolder: string,
  ): [Partial<Options>, CompileOptions] {
    const pluginOptions: Partial<Options> = {
      extractMetaCSP: {
        defaultPolicyFile: join("__tests__", distFolder, "index.html"),
        enabled: true,
        perFilePolicyFiles: [
          join("__tests__", distFolder, "file1.html"),
          join("__tests__", distFolder, "file2.html"),
        ],
      },
    };
    const compileOptions: CompileOptions = {
      bundlerOptions: {
        plugins: [
          htaccess(pluginOptions),
          {
            generateBundle(): void {
              this.emitFile({
                fileName: "index.html",
                source:
                  '<!DOCTYPE html><html><head><meta http-equiv="content-security-policy" content="CSP-value"></head><body></body></html>',
                type: "asset",
              });
              this.emitFile({
                fileName: "file1.html",
                source:
                  '<!DOCTYPE html><html><head><meta http-equiv="content-security-policy" content="CSP-value-1"></head><body></body></html>',
                type: "asset",
              });
              this.emitFile({
                fileName: "file2.html",
                source:
                  '<!DOCTYPE html><html><head><meta http-equiv="content-security-policy" content="CSP-value-2"></head><body></body></html>',
                type: "asset",
              });
            },
            name: "Emit index.html",
          },
        ],
      },
      write: true,
    };
    return [pluginOptions, compileOptions];
  }
  const output = (distFolder: string): string =>
    `Header always set Content-Security-Policy "CSP-value"\n<Files "${join("__tests__", distFolder, "file1.html")}">\n\tHeader always set Content-Security-Policy "CSP-value-1"\n</Files>\n<Files "${join("__tests__", distFolder, "file2.html")}">\n\tHeader always set Content-Security-Policy "CSP-value-2"\n</Files>`;
  await compileRollup(...configGenerator("dist-rollup"));

  expect((await readFile("__tests__/dist-rollup/.htaccess")).trim()).toBe(
    output("dist-rollup"),
  );

  await compileVite(...configGenerator("dist-vite"));

  expect((await readFile("__tests__/dist-vite/.htaccess")).trim()).toBe(
    output("dist-vite"),
  );
});

test("CSP extraction with glob per-file policies", async () => {
  expect.assertions(2);

  function configGenerator(
    distFolder: string,
  ): [Partial<Options>, CompileOptions] {
    const pluginOptions: Partial<Options> = {
      extractMetaCSP: {
        defaultPolicyFile: join("__tests__", distFolder, "index.html"),
        enabled: true,
        perFilePolicyFiles: [
          join("__tests__", distFolder, "*.html"),
          `!${join("__tests__", distFolder, "index.html")}`,
        ],
      },
    };
    const compileOptions: CompileOptions = {
      bundlerOptions: {
        plugins: [
          htaccess(pluginOptions),
          {
            generateBundle(): void {
              this.emitFile({
                fileName: "index.html",
                source:
                  '<!DOCTYPE html><html><head><meta http-equiv="content-security-policy" content="CSP-value"></head><body></body></html>',
                type: "asset",
              });
              this.emitFile({
                fileName: "file1.html",
                source:
                  '<!DOCTYPE html><html><head><meta http-equiv="content-security-policy" content="CSP-value-1"></head><body></body></html>',
                type: "asset",
              });
              this.emitFile({
                fileName: "file2.html",
                source:
                  '<!DOCTYPE html><html><head><meta http-equiv="content-security-policy" content="CSP-value-2"></head><body></body></html>',
                type: "asset",
              });
            },
            name: "Emit index.html",
          },
        ],
      },
      write: true,
    };
    return [pluginOptions, compileOptions];
  }
  const output = (distFolder: string): string =>
    `Header always set Content-Security-Policy "CSP-value"\n<Files "${join("__tests__", distFolder, "file2.html")}">\n\tHeader always set Content-Security-Policy "CSP-value-2"\n</Files>\n<Files "${join("__tests__", distFolder, "file1.html")}">\n\tHeader always set Content-Security-Policy "CSP-value-1"\n</Files>`;
  await compileRollup(...configGenerator("dist-rollup"));

  expect((await readFile("__tests__/dist-rollup/.htaccess")).trim()).toBe(
    output("dist-rollup"),
  );

  await compileVite(...configGenerator("dist-vite"));

  expect((await readFile("__tests__/dist-vite/.htaccess")).trim()).toBe(
    output("dist-vite"),
  );
});
