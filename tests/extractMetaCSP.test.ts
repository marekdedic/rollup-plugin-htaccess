import { join } from "node:path";
import { rimraf } from "rimraf";
import { version as viteVersion } from "vite";
import { beforeEach, expect, test } from "vitest";

import htaccess, { type Options } from "../src";
import { readFile, writeFile } from "../src/utils";
import {
  buildViteApp,
  type CompileOptions,
  compileRolldown,
  compileRollup,
  compileVite,
} from "./utils";

const viteMajor = parseInt(viteVersion.split(".")[0], 10);

beforeEach(async () => {
  await rimraf("tests/dist-rolldown");
  await rimraf("tests/dist-rollup");
  await rimraf("tests/dist-vite");
});

test("Basic CSP extraction", async () => {
  expect.assertions(3);

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

  await compileRolldown(...configGenerator("dist-rolldown"));

  expect((await readFile("tests/dist-rolldown/.htaccess")).trim()).toBe(output);

  await compileRollup(...configGenerator("dist-rollup"));

  expect((await readFile("tests/dist-rollup/.htaccess")).trim()).toBe(output);

  await compileVite(...configGenerator("dist-vite"));

  expect((await readFile("tests/dist-vite/.htaccess")).trim()).toBe(output);
});

test("CSP extraction disabled", async () => {
  expect.assertions(3);

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

  await compileRolldown(pluginOptions, compileOptions);

  expect((await readFile("tests/dist-rolldown/.htaccess")).trim()).toBe(output);

  await compileRollup(pluginOptions, compileOptions);

  expect((await readFile("tests/dist-rollup/.htaccess")).trim()).toBe(output);

  await compileVite(pluginOptions, compileOptions);

  expect((await readFile("tests/dist-vite/.htaccess")).trim()).toBe(output);
});

test("CSP extraction with custom .htaccess", async () => {
  expect.assertions(3);

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

  await compileRolldown(...configGenerator("dist-rolldown"));

  expect((await readFile("tests/dist-rolldown/custom.txt")).trim()).toBe(
    output,
  );

  await compileRollup(...configGenerator("dist-rollup"));

  expect((await readFile("tests/dist-rollup/custom.txt")).trim()).toBe(output);

  await compileVite(...configGenerator("dist-vite"));

  expect((await readFile("tests/dist-vite/custom.txt")).trim()).toBe(output);
});

test("CSP extraction with non-existent HTML file", async () => {
  expect.assertions(3);

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

  await compileRolldown(...configGenerator("dist-rolldown"));

  expect((await readFile("tests/dist-rolldown/.htaccess")).trim()).toBe(output);

  await compileRollup(...configGenerator("dist-rollup"));

  expect((await readFile("tests/dist-rollup/.htaccess")).trim()).toBe(output);

  await compileVite(...configGenerator("dist-vite"));

  expect((await readFile("tests/dist-vite/.htaccess")).trim()).toBe(output);
});

test("CSP extraction with no valid meta tags", async () => {
  expect.assertions(3);

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

  await compileRolldown(...configGenerator("dist-rolldown"));

  expect((await readFile("tests/dist-rolldown/.htaccess")).trim()).toBe(output);

  await compileRollup(...configGenerator("dist-rollup"));

  expect((await readFile("tests/dist-rollup/.htaccess")).trim()).toBe(output);

  await compileVite(...configGenerator("dist-vite"));

  expect((await readFile("tests/dist-vite/.htaccess")).trim()).toBe(output);
});

test("CSP extraction with conflicting directives", async () => {
  expect.assertions(3);

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
    compileRolldown(...configGenerator("dist-rolldown")),
  ).rejects.toThrow(
    "Found multiple conflicting CSP directives when extracting from meta tags.",
  );
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
  expect.assertions(3);

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

  await compileRolldown(...configGenerator("dist-rolldown"));

  expect((await readFile("tests/dist-rolldown/.htaccess")).trim()).toBe(output);

  await compileRollup(...configGenerator("dist-rollup"));

  expect((await readFile("tests/dist-rollup/.htaccess")).trim()).toBe(output);

  await compileVite(...configGenerator("dist-vite"));

  expect((await readFile("tests/dist-vite/.htaccess")).trim()).toBe(output);
});

test("CSP extraction with other meta tags", async () => {
  expect.assertions(3);

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

  await compileRolldown(...configGenerator("dist-rolldown"));

  expect((await readFile("tests/dist-rolldown/.htaccess")).trim()).toBe(output);

  await compileRollup(...configGenerator("dist-rollup"));

  expect((await readFile("tests/dist-rollup/.htaccess")).trim()).toBe(output);

  await compileVite(...configGenerator("dist-vite"));

  expect((await readFile("tests/dist-vite/.htaccess")).trim()).toBe(output);
});

test("CSP extraction with per-file policies", async () => {
  expect.assertions(3);

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

  await compileRolldown(...configGenerator("dist-rolldown"));

  expect((await readFile("tests/dist-rolldown/.htaccess")).trim()).toBe(output);

  await compileRollup(...configGenerator("dist-rollup"));

  expect((await readFile("tests/dist-rollup/.htaccess")).trim()).toBe(output);

  await compileVite(...configGenerator("dist-vite"));

  expect((await readFile("tests/dist-vite/.htaccess")).trim()).toBe(output);
});

test("CSP extraction with only per-file policies", async () => {
  expect.assertions(3);

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

  await compileRolldown(...configGenerator("dist-rolldown"));

  expect((await readFile("tests/dist-rolldown/.htaccess")).trim()).toBe(output);

  await compileRollup(...configGenerator("dist-rollup"));

  expect((await readFile("tests/dist-rollup/.htaccess")).trim()).toBe(output);

  await compileVite(...configGenerator("dist-vite"));

  expect((await readFile("tests/dist-vite/.htaccess")).trim()).toBe(output);
});

test("CSP extraction with glob per-file policies", async () => {
  expect.assertions(3);

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

  await compileRolldown(...configGenerator("dist-rolldown"));

  expect((await readFile("tests/dist-rolldown/.htaccess")).trim()).toBe(output);

  await compileRollup(...configGenerator("dist-rollup"));

  expect((await readFile("tests/dist-rollup/.htaccess")).trim()).toBe(output);

  await compileVite(...configGenerator("dist-vite"));

  expect((await readFile("tests/dist-vite/.htaccess")).trim()).toBe(output);
});

test("CSP extraction with files in subdirectories", async () => {
  expect.assertions(3);

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

  await compileRolldown(...configGenerator("dist-rolldown"));

  expect((await readFile("tests/dist-rolldown/.htaccess")).trim()).toBe(output);

  await compileRollup(...configGenerator("dist-rollup"));

  expect((await readFile("tests/dist-rollup/.htaccess")).trim()).toBe(output);

  await compileVite(...configGenerator("dist-vite"));

  expect((await readFile("tests/dist-vite/.htaccess")).trim()).toBe(output);
});

// Vite 7 introduced the buildApp plugin hook
test.skipIf(viteMajor < 7)(
  "CSP extraction from HTML written in a post buildApp hook",
  async () => {
    expect.assertions(2);

    await buildViteApp(
      {
        extractMetaCSP: {
          defaultPolicyFile: "index.html",
          enabled: true,
        },
      },
      [
        {
          buildApp: {
            handler: async (builder): Promise<void> => {
              await Promise.all(
                Object.values(builder.environments).map(async (environment) =>
                  builder.build(environment),
                ),
              );
              await writeFile(
                "tests/dist-vite/index.html",
                '<!DOCTYPE html><html><head><meta http-equiv="content-security-policy" content="CSP-value"></head><body></body></html>',
              );
            },
            order: "post",
          },
          name: "Build and write index.html",
        },
      ],
    );

    expect((await readFile("tests/dist-vite/.htaccess")).trim()).toBe(
      'Header always set Content-Security-Policy "CSP-value"',
    );
    await expect(readFile("tests/dist-vite/index.html")).resolves.toBe(
      "<!DOCTYPE html><html><head></head><body></body></html>",
    );
  },
);

// Vite 6 introduced createBuilder
test.skipIf(viteMajor < 6)(
  "CSP extraction with the Vite app builder",
  async () => {
    expect.assertions(1);

    await buildViteApp(
      {
        extractMetaCSP: {
          defaultPolicyFile: "index.html",
          enabled: true,
        },
      },
      [
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
    );

    expect((await readFile("tests/dist-vite/.htaccess")).trim()).toBe(
      'Header always set Content-Security-Policy "CSP-value"',
    );
  },
);
