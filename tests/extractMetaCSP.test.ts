import { join } from "path";
import { rimraf } from "rimraf";
import { beforeEach, expect, test } from "vitest";

import htaccess, { type Options } from "../src";
import { readFile } from "../src/utils";
import { type CompileOptions, compileRollup, compileVite } from "./utils";

beforeEach(async () => {
  await rimraf("tests/dist-rollup");
  await rimraf("tests/dist-vite");
});

test("Basic CSP extraction", async () => {
  expect.assertions(2);

  function configGenerator(
    distFolder: string,
  ): [Partial<Options>, CompileOptions] {
    const pluginOptions: Partial<Options> = {
      extractMetaCSP: {
        defaultPolicyFile: "index.html",
        enabled: true,
        outputDir: join("tests", distFolder),
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

  expect((await readFile("tests/dist-rollup/.htaccess")).trim()).toBe(output);

  await compileVite(...configGenerator("dist-vite"));

  expect((await readFile("tests/dist-vite/.htaccess")).trim()).toBe(output);
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

  expect((await readFile("tests/dist-rollup/.htaccess")).trim()).toBe(output);

  await compileVite(pluginOptions, compileOptions);

  expect((await readFile("tests/dist-vite/.htaccess")).trim()).toBe(output);
});

test("CSP extraction with custom .htaccess", async () => {
  expect.assertions(2);

  function configGenerator(
    distFolder: string,
  ): [Partial<Options>, CompileOptions] {
    const pluginOptions: Partial<Options> = {
      extractMetaCSP: {
        defaultPolicyFile: "index.html",
        enabled: true,
        outputDir: join("tests", distFolder),
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

  expect((await readFile("tests/dist-rollup/custom.txt")).trim()).toBe(output);

  await compileVite(...configGenerator("dist-vite"));

  expect((await readFile("tests/dist-vite/custom.txt")).trim()).toBe(output);
});

test("CSP extraction with non-existent HTML file", async () => {
  expect.assertions(2);

  function configGenerator(
    distFolder: string,
  ): [Partial<Options>, CompileOptions] {
    const pluginOptions: Partial<Options> = {
      extractMetaCSP: {
        defaultPolicyFile: "incorrect.html",
        enabled: true,
        outputDir: join("tests", distFolder),
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

  expect((await readFile("tests/dist-rollup/.htaccess")).trim()).toBe(output);

  await compileVite(...configGenerator("dist-vite"));

  expect((await readFile("tests/dist-vite/.htaccess")).trim()).toBe(output);
});

test("CSP extraction with no valid meta tags", async () => {
  expect.assertions(2);

  function configGenerator(
    distFolder: string,
  ): [Partial<Options>, CompileOptions] {
    const pluginOptions: Partial<Options> = {
      extractMetaCSP: {
        defaultPolicyFile: "index.html",
        enabled: true,
        outputDir: join("tests", distFolder),
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

  expect((await readFile("tests/dist-rollup/.htaccess")).trim()).toBe(output);

  await compileVite(...configGenerator("dist-vite"));

  expect((await readFile("tests/dist-vite/.htaccess")).trim()).toBe(output);
});

test("CSP extraction with conflicting directives", async () => {
  expect.assertions(2);

  function configGenerator(
    distFolder: string,
  ): [Partial<Options>, CompileOptions] {
    const pluginOptions: Partial<Options> = {
      extractMetaCSP: {
        defaultPolicyFile: "index.html",
        enabled: true,
        outputDir: join("tests", distFolder),
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
        defaultPolicyFile: "index.html",
        enabled: true,
        outputDir: join("tests", distFolder),
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

  expect((await readFile("tests/dist-rollup/.htaccess")).trim()).toBe(output);

  await compileVite(...configGenerator("dist-vite"));

  expect((await readFile("tests/dist-vite/.htaccess")).trim()).toBe(output);
});

test("CSP extraction with other meta tags", async () => {
  expect.assertions(2);

  function configGenerator(
    distFolder: string,
  ): [Partial<Options>, CompileOptions] {
    const pluginOptions: Partial<Options> = {
      extractMetaCSP: {
        defaultPolicyFile: "index.html",
        enabled: true,
        outputDir: join("tests", distFolder),
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

  expect((await readFile("tests/dist-rollup/.htaccess")).trim()).toBe(output);

  await compileVite(...configGenerator("dist-vite"));

  expect((await readFile("tests/dist-vite/.htaccess")).trim()).toBe(output);
});

test("CSP extraction with per-file policies", async () => {
  expect.assertions(2);

  function configGenerator(
    distFolder: string,
  ): [Partial<Options>, CompileOptions] {
    const pluginOptions: Partial<Options> = {
      extractMetaCSP: {
        defaultPolicyFile: "index.html",
        enabled: true,
        outputDir: join("tests", distFolder),
        perFilePolicyFiles: ["file1.html", "file2.html"],
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
  const output =
    'Header always set Content-Security-Policy "CSP-value"\n<Files "file1.html">\n\tHeader always set Content-Security-Policy "CSP-value-1"\n</Files>\n<Files "file2.html">\n\tHeader always set Content-Security-Policy "CSP-value-2"\n</Files>';
  await compileRollup(...configGenerator("dist-rollup"));

  expect((await readFile("tests/dist-rollup/.htaccess")).trim()).toBe(output);

  await compileVite(...configGenerator("dist-vite"));

  expect((await readFile("tests/dist-vite/.htaccess")).trim()).toBe(output);
});

test("CSP extraction with only per-file policies", async () => {
  expect.assertions(2);

  function configGenerator(
    distFolder: string,
  ): [Partial<Options>, CompileOptions] {
    const pluginOptions: Partial<Options> = {
      extractMetaCSP: {
        enabled: true,
        outputDir: join("tests", distFolder),
        perFilePolicyFiles: ["file1.html", "file2.html"],
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
  const output =
    '<Files "file1.html">\n\tHeader always set Content-Security-Policy "CSP-value-1"\n</Files>\n<Files "file2.html">\n\tHeader always set Content-Security-Policy "CSP-value-2"\n</Files>';
  await compileRollup(...configGenerator("dist-rollup"));

  expect((await readFile("tests/dist-rollup/.htaccess")).trim()).toBe(output);

  await compileVite(...configGenerator("dist-vite"));

  expect((await readFile("tests/dist-vite/.htaccess")).trim()).toBe(output);
});

test("CSP extraction with glob per-file policies", async () => {
  expect.assertions(2);

  function configGenerator(
    distFolder: string,
  ): [Partial<Options>, CompileOptions] {
    const pluginOptions: Partial<Options> = {
      extractMetaCSP: {
        defaultPolicyFile: "index.html",
        enabled: true,
        outputDir: join("tests", distFolder),
        perFilePolicyFiles: ["*.html", "!index.html"],
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
  const output =
    'Header always set Content-Security-Policy "CSP-value"\n<Files "file1.html">\n\tHeader always set Content-Security-Policy "CSP-value-1"\n</Files>\n<Files "file2.html">\n\tHeader always set Content-Security-Policy "CSP-value-2"\n</Files>';
  await compileRollup(...configGenerator("dist-rollup"));

  expect((await readFile("tests/dist-rollup/.htaccess")).trim()).toBe(output);

  await compileVite(...configGenerator("dist-vite"));

  expect((await readFile("tests/dist-vite/.htaccess")).trim()).toBe(output);
});

test("CSP extraction with files in subdirectories", async () => {
  expect.assertions(2);

  function configGenerator(
    distFolder: string,
  ): [Partial<Options>, CompileOptions] {
    const pluginOptions: Partial<Options> = {
      extractMetaCSP: {
        enabled: true,
        outputDir: join("tests", distFolder),
        perFilePolicyFiles: ["file1.html", "subdir/file2.html"],
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
                fileName: "subdir/file2.html",
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
  const output =
    '<Files "file1.html">\n\tHeader always set Content-Security-Policy "CSP-value-1"\n</Files>\n<If "%{REQUEST_FILENAME} =~ /subdir\\x{2f}file2\\.html$/">\n\tHeader always set Content-Security-Policy "CSP-value-2"\n</If>';
  await compileRollup(...configGenerator("dist-rollup"));

  expect((await readFile("tests/dist-rollup/.htaccess")).trim()).toBe(output);

  await compileVite(...configGenerator("dist-vite"));

  expect((await readFile("tests/dist-vite/.htaccess")).trim()).toBe(output);
});
