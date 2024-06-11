import { escapeValue } from "../utils";

type ContentSecurityPolicySourceDirective =
  | "base-uri"
  | "connect-src"
  | "default-src"
  | "fenced-frame-src"
  | "font-src"
  | "form-action"
  | "frame-ancestors"
  | "frame-src"
  | "img-src"
  | "manifest-src"
  | "media-src"
  | "object-src"
  | "script-src-attr"
  | "script-src-elem"
  | "script-src"
  | "style-src-attr"
  | "style-src-elem"
  | "style-src"
  | "worker-src";

/* eslint-disable @typescript-eslint/naming-convention -- These are CSP values */
interface ContentSecurityPolicySources {
  hosts?: Array<string>;
  schemes?: {
    data?: boolean;
    mediastream?: boolean;
    blob?: boolean;
    filesystem?: boolean;
  };
  self?: boolean;
  "unsafe-eval"?: boolean;
  "wasm-unsafe-eval"?: boolean;
  "unsafe-hashes"?: boolean;
  "unsafe-inline"?: boolean;
  nonces?: Array<string>;
  hashes?: {
    sha256?: Array<string>;
    sha384?: Array<string>;
    sha512?: Array<string>;
  };
  "strict-dynamic"?: boolean;
  "report-sample"?: boolean;
  "inline-speculation-rules"?: boolean;
}
/* eslint-enable */

type ContentSecurityPolicySandboxValue =
  | "allow-downloads-without-user-activation Experimental"
  | "allow-downloads"
  | "allow-forms"
  | "allow-modals"
  | "allow-orientation-lock"
  | "allow-pointer-lock"
  | "allow-popups-to-escape-sandbox"
  | "allow-popups"
  | "allow-presentation"
  | "allow-same-origin"
  | "allow-scripts"
  | "allow-storage-access-by-user-activation Experimental"
  | "allow-top-navigation-by-user-activation"
  | "allow-top-navigation-to-custom-protocols"
  | "allow-top-navigation"
  | null;

/* eslint-disable @typescript-eslint/naming-convention -- These are directive names and values */
interface ContentSecurityPolicyTrustedTypesValue {
  policies?: Array<string>;
  "allow-duplicates"?: boolean;
}

export type ContentSecurityPolicySpec = Partial<
  Record<ContentSecurityPolicySourceDirective, ContentSecurityPolicySources> & {
    sandbox: ContentSecurityPolicySandboxValue;
    "report-uri": Array<string>;
    "report-to": string;
    "require-trusted-types-for": "script";
    "upgrade-insecure-requests": boolean;
    "trusted-types": ContentSecurityPolicyTrustedTypesValue;
  }
>;
/* eslint-enable */

function buildSandboxPart(
  valueSpec: ContentSecurityPolicySandboxValue,
): string {
  if (valueSpec !== null) {
    return "sandbox " + valueSpec;
  } else {
    return "sandbox";
  }
}

function buildTrustedTypesPart(
  valueSpec: ContentSecurityPolicyTrustedTypesValue,
): string {
  const parts = ["trusted-types", ...(valueSpec.policies ?? [])];
  if (valueSpec["allow-duplicates"] === true) {
    parts.push("'allow-duplicates'");
  }
  return parts.join(" ");
}

function buildSourcePart(
  directive: ContentSecurityPolicySourceDirective,
  sourceSpec: ContentSecurityPolicySources,
): string {
  const sources = [];
  for (const source of [
    "self",
    "unsafe-eval",
    "wasm-unsafe-eval",
    "unsafe-hashes",
    "unsafe-inline",
    "strict-dynamic",
    "report-sample",
    "inline-speculation-rules",
  ] as const) {
    if (sourceSpec[source] === true) {
      sources.push("'" + source + "'");
    }
  }
  if (sourceSpec.schemes !== undefined) {
    for (const scheme of [
      "data",
      "mediastream",
      "blob",
      "filesystem",
    ] as const) {
      if (sourceSpec.schemes[scheme] === true) {
        sources.push(scheme + ":");
      }
    }
  }
  if (sourceSpec.nonces !== undefined) {
    sources.push(...sourceSpec.nonces.map((nonce) => "nonce-" + nonce));
  }
  if (sourceSpec.hashes !== undefined) {
    for (const algo of ["sha256", "sha384", "sha512"] as const) {
      const hashes = sourceSpec.hashes[algo];
      if (hashes !== undefined) {
        sources.push(...hashes.map((hash) => algo + "-" + hash));
      }
    }
  }
  if (sourceSpec.hosts !== undefined) {
    sources.push(...sourceSpec.hosts.map(escapeValue));
  }
  if (sources.length === 0) {
    sources.push("'none'");
  }
  return directive + " " + sources.join(" ");
}

function buildPart<
  T extends keyof ContentSecurityPolicySpec,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Needed to correctly infer value type
  V extends ContentSecurityPolicySpec[T] & Record<T, any>,
>(directive: T, valueSpec: V[T]): string {
  switch (directive) {
    case "sandbox":
      return buildSandboxPart(valueSpec);
    case "report-uri":
      return ["report-uri", ...valueSpec].join(" ");
    case "report-to":
      return "report-to " + (valueSpec as string);
    case "require-trusted-types-for":
      return "require-trusted-types-for 'script'";
    case "upgrade-insecure-requests":
      return "upgrade-insecure-requests";
    case "trusted-types":
      return buildTrustedTypesPart(valueSpec);
    default:
      return buildSourcePart(directive, valueSpec);
  }
}

export function buildContentSecurityPolicyValue(
  spec: ContentSecurityPolicySpec,
): string {
  const parts = [];
  for (const directive in spec) {
    parts.push(
      buildPart(
        directive as keyof ContentSecurityPolicySpec,
        spec[directive as keyof ContentSecurityPolicySpec],
      ),
    );
  }
  return '"' + parts.join("; ") + '"';
}
