/* eslit-env node */

import * as fs from "fs";
import * as path from "path";
import type { Plugin } from "rollup";

type ReferrerPolicySpec =
  | "no-referrer-when-downgrade"
  | "no-referrer"
  | "origin-when-cross-origin"
  | "origin"
  | "same-origin"
  | "strict-origin-when-cross-origin"
  | "strict-origin"
  | "unsafe-url";

interface StrictTransportSecuritySpec {
  maxAge: number;
  includeSubDomains?: boolean;
  preload?: boolean;
}

/* eslint-disable @typescript-eslint/naming-convention -- These are header names */
interface HeaderValueSpecMap {
  "Referrer-Policy": ReferrerPolicySpec;
  "Strict-Transport-Security": StrictTransportSecuritySpec;
}
/* eslint-enable */

type HeaderSpec<T extends keyof HeaderValueSpecMap> = {
  header: T;
  always?: boolean;
  condition?:
    | {
        envVar: string;
        requireUnset?: boolean;
      }
    | {
        expression: string;
      };
} & (
  | {
      action: "add" | "append" | "merge" | "set" | "setifempty";
      value: HeaderValueSpecMap[T];
    }
  | {
      action: "echo" | "note" | "unset";
    }
  | {
      action: "edit" | "edit*";
      value: string;
      replacement: string;
    }
);

type HeaderSpecUnion = {
  [K in keyof HeaderValueSpecMap]: HeaderSpec<K>;
}[keyof HeaderValueSpecMap];

interface Options {
  fileName: string;
  template: string | undefined;
  headers: Array<HeaderSpecUnion>;
}

function buildReferrerPolicyValue(spec: ReferrerPolicySpec): string {
  return spec;
}

function buildStrictTransportSecurityValue(
  spec: StrictTransportSecuritySpec,
): string {
  return (
    "max-age=" +
    spec.maxAge.toString() +
    (spec.includeSubDomains === true ? "; includeSubDomains" : "") +
    (spec.preload === true ? "; preload" : "")
  );
}

function buildHeaderValue<
  T extends keyof HeaderValueSpecMap,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Needed to correctly infer value type
  V extends HeaderValueSpecMap[T] & Record<T, any>,
>(header: T, value: V[T]): string {
  if (header === "Referrer-Policy") {
    return buildReferrerPolicyValue(value);
  }
  switch (header) {
    case "Referrer-Policy":
      return buildReferrerPolicyValue(value);
    case "Strict-Transport-Security":
      return buildStrictTransportSecurityValue(value);
  }
  throw new Error('Unknown header type "' + header + '".');
}

function buildHeader(spec: HeaderSpecUnion): string {
  const parts = ["Header"];
  if (spec.always === true) {
    parts.push("always");
  }
  parts.push(spec.action, spec.header);
  if (["add", "append", "merge", "set", "setifempty"].includes(spec.action)) {
    parts.push(
      buildHeaderValue(
        spec.header,
        (spec as { value: HeaderValueSpecMap[keyof HeaderValueSpecMap] }).value,
      ),
    );
  } else if (["edit", "edit*"].includes(spec.action)) {
    parts.push(
      '"' + (spec as { value: string }).value.replaceAll('"', '\\"') + '"',
    );
    parts.push(
      '"' +
        (spec as { replacement: string }).replacement.replaceAll('"', '\\"') +
        '"',
    );
  }
  if (spec.condition !== undefined) {
    if ("envVar" in spec.condition) {
      parts.push(
        "env=" +
          (spec.condition.requireUnset === true ? "!" : "") +
          spec.condition.envVar,
      );
    } else if ("expression" in spec.condition) {
      parts.push("expr=" + spec.condition.expression);
    }
  }
  return parts.join(" ");
}

function buildHtaccessFile(options: Options, root: string): string {
  let output = "";
  if (options.template !== undefined) {
    output +=
      fs
        .readFileSync(path.join(root, options.template), "utf8")
        .replaceAll("\r", "") + "\n";
  }
  for (const header of options.headers) {
    output += buildHeader(header) + "\n";
  }
  return output;
}

export default function htaccess(opts: Partial<Options>): Plugin {
  const options: Options = {
    fileName: ".htaccess",
    template: undefined,
    headers: [],
    ...opts,
  };
  let root = "/";

  return {
    name: "htaccess",
    configResolved: (config: { root: string }): void => {
      root = config.root === "" ? "./" : config.root;
    },
    generateBundle(): void {
      this.emitFile({
        type: "asset",
        fileName: options.fileName,
        source: buildHtaccessFile(options, root),
      });
    },
  } as Plugin;
}
