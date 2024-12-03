import type { PluginContext } from "rollup";

import { escapeValue } from "../utils";
import {
  buildContentSecurityPolicyValue,
  type ContentSecurityPolicySpec,
} from "./Header/ContentSecurityPolicy";
import {
  buildPermissionsPolicyValue,
  type PermissionsPolicySpec,
} from "./Header/PermissionsPolicy";
import {
  buildReferrerPolicyValue,
  type ReferrerPolicySpec,
} from "./Header/ReferrerPolicy";
import {
  buildStrictTransportSecurityValue,
  type StrictTransportSecuritySpec,
} from "./Header/StrictTransportSecurity";
import {
  buildXContentTypeOptionsValue,
  type XContentTypeOptionsSpec,
} from "./Header/XContentTypeOptions";
import {
  buildXFrameOptionsValue,
  type XFrameOptionsSpec,
} from "./Header/XFrameOptions";
import {
  buildXXssProtectionValue,
  type XXssProtectionSpec,
} from "./Header/XXssProtection";

/**
 * @public
 */
export type HeaderSpec<T extends keyof HeaderValueSpecMap> = {
  always?: boolean;
  condition?:
    | {
        envVar: string;
        requireUnset?: boolean;
      }
    | {
        expression: string;
      };
  header: T;
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
      replacement: string;
      value: string;
    }
);

/**
 * @public
 */
export type HeaderSpecUnion = {
  [K in keyof HeaderValueSpecMap]: HeaderSpec<K>;
}[keyof HeaderValueSpecMap];

/* eslint-disable @typescript-eslint/no-deprecated -- Internal deprecation */

/**
 * @public
 */
export interface HeaderValueSpecMap {
  "Content-Security-Policy": ContentSecurityPolicySpec;
  "Permissions-Policy": PermissionsPolicySpec;
  "Referrer-Policy": ReferrerPolicySpec;
  "Strict-Transport-Security": StrictTransportSecuritySpec;
  "X-Content-Type-Options": XContentTypeOptionsSpec;
  /**
   * @deprecated The Content-Security-Policy HTTP header has a frame-ancestors directive which obsoletes this header for supporting browsers.
   */
  "X-Frame-Options": XFrameOptionsSpec;
  /**
   * @deprecated This feature is non-standard and is not on a standards track. Do not use it on production sites facing the Web: it will not work for every user. There may also be large incompatibilities between implementations and the behavior may change in the future.
   */
  "X-Xss-Protection": XXssProtectionSpec;
}

/* eslint-enable */

export function buildHeader(
  context: PluginContext,
  spec: HeaderSpecUnion,
): string {
  const parts = ["Header"];
  if (spec.always === true) {
    parts.push("always");
  }
  parts.push(spec.action, spec.header);
  if (["add", "append", "merge", "set", "setifempty"].includes(spec.action)) {
    parts.push(
      `"${buildHeaderValue(
        context,
        spec.header,
        (spec as { value: HeaderValueSpecMap[keyof HeaderValueSpecMap] }).value,
      )}"`,
    );
  } else if (["edit", "edit*"].includes(spec.action)) {
    parts.push(`"${escapeValue((spec as { value: string }).value)}"`);
    parts.push(
      `"${escapeValue((spec as { replacement: string }).replacement)}"`,
    );
  }
  if (spec.condition !== undefined) {
    if ("envVar" in spec.condition) {
      parts.push(
        `env=${spec.condition.requireUnset === true ? "!" : ""}${spec.condition.envVar}`,
      );
    } else if ("expression" in spec.condition) {
      parts.push(`"expr=${escapeValue(spec.condition.expression)}"`);
    }
  }
  return parts.join(" ");
}

// eslint-disable-next-line consistent-return -- Clashes with typescript unreachable code check
function buildHeaderValue<T extends keyof HeaderValueSpecMap>(
  context: PluginContext,
  header: T,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Needed to correctly infer value type
  value: (HeaderValueSpecMap[T] & Record<T, any>)[T],
): string {
  switch (header) {
    case "Content-Security-Policy":
      return buildContentSecurityPolicyValue(value);
    case "Permissions-Policy":
      return buildPermissionsPolicyValue(value);
    case "Referrer-Policy":
      return buildReferrerPolicyValue(value);
    case "Strict-Transport-Security":
      return buildStrictTransportSecurityValue(context, value);
    case "X-Content-Type-Options":
      return buildXContentTypeOptionsValue();
    case "X-Frame-Options":
      return buildXFrameOptionsValue(value);
    case "X-Xss-Protection":
      return buildXXssProtectionValue(value);
    default:
      context.error(`Unknown header type "${header}".`);
  }
}
