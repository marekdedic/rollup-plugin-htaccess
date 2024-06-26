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

interface HeaderValueSpecMap {
  "Content-Security-Policy": ContentSecurityPolicySpec;
  "Permissions-Policy": PermissionsPolicySpec;
  "Referrer-Policy": ReferrerPolicySpec;
  "Strict-Transport-Security": StrictTransportSecuritySpec;
  "X-Content-Type-Options": XContentTypeOptionsSpec;
  "X-Frame-Options": XFrameOptionsSpec;
  "X-Xss-Protection": XXssProtectionSpec;
}

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

export type HeaderSpecUnion = {
  [K in keyof HeaderValueSpecMap]: HeaderSpec<K>;
}[keyof HeaderValueSpecMap];

function buildHeaderValue<
  T extends keyof HeaderValueSpecMap,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Needed to correctly infer value type
  V extends HeaderValueSpecMap[T] & Record<T, any>,
>(header: T, value: V[T]): string {
  switch (header) {
    case "Content-Security-Policy":
      return buildContentSecurityPolicyValue(value);
    case "Permissions-Policy":
      return buildPermissionsPolicyValue(value);
    case "Referrer-Policy":
      return buildReferrerPolicyValue(value);
    case "Strict-Transport-Security":
      return buildStrictTransportSecurityValue(value);
    case "X-Content-Type-Options":
      return buildXContentTypeOptionsValue();
    case "X-Frame-Options":
      return buildXFrameOptionsValue(value);
    case "X-Xss-Protection":
      return buildXXssProtectionValue(value);
  }
  throw new Error('Unknown header type "' + header + '".');
}

export function buildHeader(spec: HeaderSpecUnion): string {
  const parts = ["Header"];
  if (spec.always === true) {
    parts.push("always");
  }
  parts.push(spec.action, spec.header);
  if (["add", "append", "merge", "set", "setifempty"].includes(spec.action)) {
    parts.push(
      '"' +
        buildHeaderValue(
          spec.header,
          (spec as { value: HeaderValueSpecMap[keyof HeaderValueSpecMap] })
            .value,
        ) +
        '"',
    );
  } else if (["edit", "edit*"].includes(spec.action)) {
    parts.push('"' + escapeValue((spec as { value: string }).value) + '"');
    parts.push(
      '"' + escapeValue((spec as { replacement: string }).replacement) + '"',
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
      parts.push('"expr=' + escapeValue(spec.condition.expression) + '"');
    }
  }
  return parts.join(" ");
}
