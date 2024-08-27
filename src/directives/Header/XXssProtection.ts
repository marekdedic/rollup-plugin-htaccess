import { escapeValue } from "../../utils";

/**
 * @public
 * @deprecated This feature is non-standard and is not on a standards track. Do not use it on production sites facing the Web: it will not work for every user. There may also be large incompatibilities between implementations and the behavior may change in the future.
 */
export type XXssProtectionSpec =
  | {
      mode: "block";
    }
  | {
      mode: "disabled";
    }
  | {
      mode: "sanitize";
      reportUri?: string;
    };

// eslint-disable-next-line @typescript-eslint/no-deprecated -- Internal deprecation
export function buildXXssProtectionValue(spec: XXssProtectionSpec): string {
  switch (spec.mode) {
    case "block":
      return "1; mode=block";
    case "sanitize":
      if (spec.reportUri !== undefined) {
        return `1; report=${escapeValue(spec.reportUri)}`;
      }
      return "1";
    default:
      return "0";
  }
}
