interface RewriteOptionsSpec {
  Inherit?: boolean;
  InheritDown?: boolean;
  InheritDownBefore?: boolean;
  IgnoreInherit?: boolean;
  AllowNoSlash?: boolean;
  AllowAnyURI?: boolean;
  MergeBase?: boolean;
  IgnoreContextInfo?: boolean;
  LegacyPrefixDocRoot?: boolean;
}

interface RewriteCondSpec {
  testString: string;
  conditionPattern: string;
  flags?: {
    nocase?: boolean;
    ornext?: boolean;
    novary?: boolean;
  };
}

interface RewriteRuleCookieFlagMinimalSpec {
  name: string;
  value: string;
  domain: string;
}

type RewriteRuleCookieFlagSpec = RewriteRuleCookieFlagMinimalSpec &
  (
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
  );

interface StandardRewriteRuleFlags {
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

interface MetadataRewriteRuleFlags {
  env?: {
    variable: string;
    value: string | null;
  };
  handler?: string;
  type?: string;
}

type RewriteRuleSpec = {
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

export interface RewriteSpec {
  base?: string;
  options?: RewriteOptionsSpec;
  rules?: Array<RewriteRuleSpec>;
}
