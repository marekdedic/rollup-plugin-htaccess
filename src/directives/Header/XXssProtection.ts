import { escapeValue } from "../../utils";

/**
 * @public
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

export function buildXXssProtectionValue(spec: XXssProtectionSpec): string {
  switch (spec.mode) {
    case "block":
      return "1; mode=block";
    case "disabled":
      return "0";
    case "sanitize":
      if (spec.reportUri !== undefined) {
        return "1; report=" + escapeValue(spec.reportUri);
      }
      return "1";
  }
}
