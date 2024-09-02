import { escapeValue } from "../../utils";

/**
 * @public
 */
export type ContentSecurityPolicySourceDirective =
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

/**
 * @public
 */
export interface ContentSecurityPolicySources {
  hashes?: {
    sha256?: Array<string>;
    sha384?: Array<string>;
    sha512?: Array<string>;
  };
  hosts?: Array<string>;
  "inline-speculation-rules"?: boolean;
  nonces?: Array<string>;
  "report-sample"?: boolean;
  schemes?: {
    blob?: boolean;
    data?: boolean;
    filesystem?: boolean;
    mediastream?: boolean;
  };
  self?: boolean;
  "strict-dynamic"?: boolean;
  "unsafe-eval"?: boolean;
  "unsafe-hashes"?: boolean;
  "unsafe-inline"?: boolean;
  "wasm-unsafe-eval"?: boolean;
}

/**
 * @public
 */
export type ContentSecurityPolicySandboxValue =
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

/**
 * @public
 */
export interface ContentSecurityPolicyTrustedTypesValue {
  "allow-duplicates"?: boolean;
  policies?: Array<string>;
}

/**
 * @public
 */
export type ContentSecurityPolicySpec = Partial<
  {
    "report-to": string;
    /**
     * @deprecated The report-uri directive is deprecated and it's recommended to send CSP reports using report-to instead.
     */
    "report-uri": Array<string>;
    "require-trusted-types-for": "script";
    sandbox: ContentSecurityPolicySandboxValue;
    "trusted-types": ContentSecurityPolicyTrustedTypesValue;
    "upgrade-insecure-requests": boolean;
  } & Record<ContentSecurityPolicySourceDirective, ContentSecurityPolicySources>
>;

function buildSandboxPart(
  valueSpec: ContentSecurityPolicySandboxValue,
): string {
  if (valueSpec !== null) {
    return `sandbox ${valueSpec}`;
  }
  return "sandbox";
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
      sources.push(`'${source}'`);
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
        sources.push(`${scheme}:`);
      }
    }
  }
  if (sourceSpec.nonces !== undefined) {
    sources.push(...sourceSpec.nonces.map((nonce) => `'nonce-${nonce}'`));
  }
  if (sourceSpec.hashes !== undefined) {
    for (const algo of ["sha256", "sha384", "sha512"] as const) {
      const hashes = sourceSpec.hashes[algo];
      if (hashes !== undefined) {
        sources.push(...hashes.map((hash) => `'${algo}-${hash}'`));
      }
    }
  }
  if (sourceSpec.hosts !== undefined) {
    sources.push(...sourceSpec.hosts.map(escapeValue));
  }
  if (sources.length === 0) {
    sources.push("'none'");
  }
  return `${directive} ${sources.join(" ")}`;
}

function buildPart<T extends keyof ContentSecurityPolicySpec>(
  directive: T,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Needed to correctly infer value type
  valueSpec: (ContentSecurityPolicySpec[T] & Record<T, any>)[T],
): string {
  switch (directive) {
    case "report-to":
      return `report-to ${valueSpec as string}`;
    case "report-uri":
      return ["report-uri", ...valueSpec].join(" ");
    case "require-trusted-types-for":
      return "require-trusted-types-for 'script'";
    case "sandbox":
      return buildSandboxPart(valueSpec);
    case "trusted-types":
      return buildTrustedTypesPart(valueSpec);
    case "upgrade-insecure-requests":
      return "upgrade-insecure-requests";
    default:
      return buildSourcePart(directive, valueSpec);
  }
}

export function buildContentSecurityPolicyValue(
  spec: ContentSecurityPolicySpec,
): string {
  const parts = [];
  for (const directive in spec) {
    if (!Object.prototype.hasOwnProperty.call(spec, directive)) {
      continue;
    }
    parts.push(
      buildPart(
        directive as keyof ContentSecurityPolicySpec,
        spec[directive as keyof ContentSecurityPolicySpec],
      ),
    );
  }
  return parts.join("; ");
}
