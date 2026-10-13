# rollup-plugin-htaccess

[![NPM Version](https://img.shields.io/npm/v/rollup-plugin-htaccess?logo=npm)](https://www.npmjs.com/package/rollup-plugin-htaccess)
[![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/marekdedic/rollup-plugin-htaccess/CI.yml?branch=master&logo=github)](https://github.com/marekdedic/rollup-plugin-htaccess/actions)
[![Codecov (with branch)](https://img.shields.io/codecov/c/github/marekdedic/rollup-plugin-htaccess/master?logo=codecov)](https://app.codecov.io/gh/marekdedic/rollup-plugin-htaccess)
[![NPM Downloads](https://img.shields.io/npm/dm/rollup-plugin-htaccess?logo=npm)](https://www.npmjs.com/package/rollup-plugin-htaccess)
[![NPM License](https://img.shields.io/npm/l/rollup-plugin-htaccess)](https://github.com/marekdedic/rollup-plugin-htaccess/blob/master/LICENSE)

![GitHub package.json dev/peer/optional dependency version (branch)](https://img.shields.io/github/package-json/dependency-version/marekdedic/rollup-plugin-htaccess/peer/rolldown/master?logo=rolldown)
![GitHub package.json dev/peer/optional dependency version (branch)](https://img.shields.io/github/package-json/dependency-version/marekdedic/rollup-plugin-htaccess/peer/rollup/master?logo=rollup.js)
![GitHub package.json dev/peer/optional dependency version (branch)](https://img.shields.io/github/package-json/dependency-version/marekdedic/rollup-plugin-htaccess/peer/vite/master?logo=vite)

A plugin for Rollup, Rolldown and Vite that enables you to create htaccess files as part of the build process.

## Requirements

- Node 20 or newer

## How to install

```sh
$ npm install --save-dev rollup-plugin-htaccess
```

## [Supported directives](./docs/directives.md)

## Extracting CSP from meta tags

With `extractMetaCSP` enabled, the plugin finds `<meta http-equiv="Content-Security-Policy">` tags in the built HTML files, removes them, and adds matching `Header always set Content-Security-Policy` directives to the generated htaccess file.

```js
htaccess({
  extractMetaCSP: {
    enabled: true,
    // The directory with the built files. Defaults to the bundler's output directory
    outputDir: "build",
    // The file whose policy is set for the whole site
    defaultPolicyFile: "index.html",
    // Glob patterns of files whose policy is set only for those files
    perFilePolicyFiles: ["admin/**/*.html"],
  },
});
```

When using Vite with a framework that writes HTML after the bundle is built (e.g. SvelteKit prerendering), add `htaccess()` **after** the framework's plugin, so that extraction runs after the HTML is written:

```js
export default defineConfig({
  plugins: [sveltekit(), htaccess({ extractMetaCSP: { enabled: true } })],
});
```
