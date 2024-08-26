import { escapeValue } from "./utils";

/**
 * @public
 */
export interface RewriteOptionsSpec {
  AllowAnyURI?: boolean;
  AllowNoSlash?: boolean;
  IgnoreContextInfo?: boolean;
  IgnoreInherit?: boolean;
  Inherit?: boolean;
  InheritDown?: boolean;
  InheritDownBefore?: boolean;
  LegacyPrefixDocRoot?: boolean;
  MergeBase?: boolean;
}

/**
 * @public
 */
export interface RewriteCondSpec {
  conditionPattern: string;
  flags?: {
    nocase?: boolean;
    ornext?: boolean;
    novary?: boolean;
  };
  testString: string;
}

/**
 * @public
 */
export interface RewriteRuleCookieFlagMinimalSpec {
  domain: string;
  name: string;
  value: string;
}

/**
 * @public
 */
export type RewriteRuleCookieFlagSpec = (
  | {
      lifetime?: number;
      path?: string;
      secure?: boolean;
      httponly?: boolean;
      samesite?: "Lax" | "None" | "Strict";
    }
  | {
      lifetime?: number;
      path?: string;
      secure?: boolean;
      httponly?: boolean;
    }
  | {
      lifetime?: number;
      path?: string;
      secure?: boolean;
    }
  | {
      lifetime?: number;
      path?: string;
    }
  | {
      lifetime?: number;
    }
) &
  RewriteRuleCookieFlagMinimalSpec;

/**
 * @public
 */
export interface StandardRewriteRuleFlags {
  B?: boolean | string;
  backrefnoplus?: boolean;
  BCTLS?: boolean;
  BNE?: string;
  chain?: boolean;
  cookie?: RewriteRuleCookieFlagSpec;
  discardpath?: boolean;
  END?: boolean;
  forbidden?: boolean;
  gone?: boolean;
  last?: boolean;
  next?: boolean;
  nocase?: boolean;
  noescape?: boolean;
  nosubreq?: boolean;
  proxy?: boolean;
  qsappend?: boolean;
  qsdiscard?: boolean;
  qslast?: boolean;
  redirect?: number | string;
  skip?: number;
  UnsafeAllow3F?: boolean;
  UnsafePrefixStat?: boolean;
}

/**
 * @public
 */
export interface MetadataRewriteRuleFlags {
  env?: {
    variable: string;
    value: string | null;
  };
  handler?: string;
  type?: string;
}

/**
 * @public
 */
export type RewriteRuleSpec = {
  conditions?: Array<RewriteCondSpec>;
  pattern: string;
} & (
  | {
      substitution: null;
      flags?: MetadataRewriteRuleFlags & StandardRewriteRuleFlags;
    }
  | {
      substitution: string;
      flags?: StandardRewriteRuleFlags;
    }
);

/**
 * @public
 */
export interface RewriteSpec {
  base?: string;
  options?: RewriteOptionsSpec;
  rules?: Array<RewriteRuleSpec>;
}

function buildRewriteOptions(spec: RewriteOptionsSpec): Array<string> {
  const output: Array<string> = [];
  for (const option in spec) {
    if (spec[option as keyof RewriteOptionsSpec] === true) {
      output.push("RewriteOptions " + option);
    }
  }
  return output;
}

function buildRewriteCondition(spec: RewriteCondSpec): string {
  const flags: Array<string> = [];
  if (spec.flags?.nocase === true) {
    flags.push("NC");
  }
  if (spec.flags?.ornext === true) {
    flags.push("OR");
  }
  if (spec.flags?.novary === true) {
    flags.push("NV");
  }
  return (
    'RewriteCond "' +
    spec.testString +
    '" "' +
    spec.conditionPattern +
    '"' +
    (flags.length > 0 ? " [" + flags.join(",") + "]" : "")
  );
}

function buildRewriteRuleCookieFlag(spec: RewriteRuleCookieFlagSpec): string {
  const output: Array<string> = [spec.name, spec.value, spec.domain];
  if (spec.lifetime !== undefined) {
    output.push(spec.lifetime.toString());
  }
  if ("path" in spec && spec.path !== undefined) {
    output.push(spec.path);
  }
  if ("secure" in spec && spec.secure === true) {
    output.push("true");
  }
  if ("httponly" in spec && spec.httponly === true) {
    output.push("true");
  }
  if ("samesite" in spec && spec.samesite !== undefined) {
    output.push(spec.samesite);
  }

  const containsColon = output.some((field) => field.includes(":"));
  return (
    "CO=" + (containsColon ? ";" : "") + output.join(containsColon ? ";" : ":")
  );
}

function buildRewriteRuleFlags(
  flags: MetadataRewriteRuleFlags & StandardRewriteRuleFlags,
): string {
  const output: Array<string> = [];
  let requireQuotes = false;

  if (flags.B === true) {
    output.push("B");
  }
  if (typeof flags.B === "string") {
    output.push("B=" + flags.B);
    if (flags.B.includes(" ")) {
      requireQuotes = true;
    }
  }
  if (flags.backrefnoplus === true) {
    output.push("BNP");
  }
  if (flags.BCTLS === true) {
    output.push("BCTLS");
  }
  if (flags.BNE !== undefined) {
    output.push("BNE=" + flags.BNE);
    if (flags.BNE.includes(" ")) {
      requireQuotes = true;
    }
  }
  if (flags.chain === true) {
    output.push("C");
  }
  if (flags.cookie !== undefined) {
    output.push(buildRewriteRuleCookieFlag(flags.cookie));
  }
  if (flags.discardpath === true) {
    output.push("DPI");
  }
  if (flags.env !== undefined) {
    let envValue = flags.env.variable;
    if (flags.env.value === null) {
      envValue = "!" + envValue;
    } else if (flags.env.value !== "") {
      envValue += ":" + flags.env.value;
    }
    output.push("E=" + envValue);
  }
  if (flags.END === true) {
    output.push("END");
  }
  if (flags.forbidden === true) {
    output.push("F");
  }
  if (flags.gone === true) {
    output.push("G");
  }
  if (flags.handler !== undefined) {
    output.push("H=" + flags.handler);
  }
  if (flags.last === true) {
    output.push("L");
  }
  if (flags.next === true) {
    output.push("N");
  }
  if (flags.nocase === true) {
    output.push("NC");
  }
  if (flags.noescape === true) {
    output.push("NE");
  }
  if (flags.nosubreq === true) {
    output.push("NS");
  }
  if (flags.proxy === true) {
    output.push("P");
  }
  if (flags.qsappend === true) {
    output.push("QSA");
  }
  if (flags.qsdiscard === true) {
    output.push("QSD");
  }
  if (flags.qslast === true) {
    output.push("QSL");
  }
  if (flags.redirect !== undefined) {
    output.push("R=" + flags.redirect.toString());
  }
  if (flags.skip !== undefined) {
    output.push("S=" + flags.skip.toString());
  }
  if (flags.type !== undefined) {
    output.push("T=" + flags.type);
  }
  if (flags.UnsafeAllow3F === true) {
    output.push("UnsafeAllow3F");
  }
  if (flags.UnsafePrefixStat === true) {
    output.push("UnsafePrefixStat");
  }

  if (output.length === 0) {
    return "";
  }
  const quote = requireQuotes ? '"' : "";
  return " " + quote + "[" + output.join(",") + "]" + quote;
}

function buildRewriteRules(spec: Array<RewriteRuleSpec>): Array<string> {
  const output: Array<string> = [];
  for (const rule of spec) {
    for (const condition of rule.conditions ?? []) {
      output.push(buildRewriteCondition(condition));
    }
    const flags =
      rule.flags !== undefined ? buildRewriteRuleFlags(rule.flags) : "";
    output.push(
      'RewriteRule "' +
        escapeValue(rule.pattern) +
        '" "' +
        escapeValue(rule.substitution ?? "-") +
        '"' +
        flags,
    );
  }
  return output;
}

export function buildRewrite(spec: RewriteSpec): string {
  const output: Array<string> = [];
  if (spec.base !== undefined) {
    output.push('RewriteBase "' + escapeValue(spec.base) + '"');
  }
  if (spec.options !== undefined) {
    output.push(...buildRewriteOptions(spec.options));
  }
  if (spec.rules !== undefined) {
    output.push(...buildRewriteRules(spec.rules));
  }
  if (output.length > 0) {
    output.unshift("RewriteEngine on");
  }
  return output.join("\n");
}
