# AGENTS.md

This file provides guidance to coding agents when working with code in this repository.

## Commands

- `npm run build` — rollup bundle + api-extractor `.d.ts` rollup (`dist/types` is removed afterwards). `npm start` watches.
- `npm run lint` — runs eslint, `tsc` over `tests/` (`test.tsconfig.json`), and `attw --pack` in parallel.
- `npm test` — vitest in watch mode; `npm run test-coverage` for a single run with coverage.
- Run one spec test: `npx vitest run tests/specs.test.ts -- <spec-path-prefix>` — `specs.test.ts` reads the argument after its own path from `process.argv` and uses it as the directory to scan instead of `tests/specs` (e.g. `tests/specs/Header`).

## Architecture

The package is a single bundler plugin (`src/plugin.ts`, default-exported through `src/index.ts`) that works with Rollup, Rolldown and Vite. Compatibility across the three is achieved by *not* depending on their types: `src/plugin-types.ts` declares minimal structural `PluginContext` / `OutputOptions` / `PluginHook` interfaces that all three bundlers satisfy.

Output generation is a pure string pipeline:

- `src/spec.ts` owns the `Spec` interface (the user-facing `spec` option) and `buildSpec()`, which emits directives in a fixed order by delegating to one `build<Directive>()` function per directive.
- Each directive lives in its own file under `src/directives/` (response headers under `src/directives/Header/`), exporting its `<Name>Spec` type and its `build<Name>` function. `src/rewrite.ts` handles mod_rewrite.
- Adding a directive means: new file in `src/directives/`, wire it into `Spec` + `buildSpec()` in `src/spec.ts`, re-export its types from `src/index.ts`, add spec tests, and update `docs/directives.md` (and `docs/response-headers.md` for headers).
- Container directives (`<Files>`, `<If>`, `<IfModule>`, …) recurse via `buildInnerSpec()` in `src/utils.ts`, which re-runs `buildSpec` and tab-indents the result. `escapeRegexString`/`escapeValue` there are the standard escaping helpers.
- Validation errors are reported through `context.error()` (which throws), never by returning error values.

`src/extractMetaCSP.ts` is a separate feature: when enabled it registers a post/sequential `closeBundle` hook that globs built HTML files, parses out `<meta http-equiv="Content-Security-Policy">` tags with htmlparser2/domutils, and appends `Header` directives to the already-emitted htaccess file on disk. It needs `renderStart`'s `OutputOptions.dir` (or Vite's resolved `root` from `configResolved`) to locate output.

All public types must be annotated `@public` — api-extractor is configured to error on forgotten exports.

## Tests

`tests/utils.ts` exposes `compileRolldown` / `compileRollup` / `compileVite`, which build `tests/fixtures/dummy.js` (or `dummy.html` for Vite) and return the emitted htaccess contents as a string. Every behaviour is asserted against all three bundlers.

The bulk of coverage is data-driven: `tests/specs.test.ts` walks `tests/specs/**` and, for each `<name>-options.ts` (default-exporting `Partial<Options>`), compares output to the sibling `<name>-output.txt` — or, if that file is absent, expects all three bundlers to reject with the message in `<name>-error.txt`. Adding a test case is just adding those files; no test code changes.
