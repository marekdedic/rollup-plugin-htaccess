import { escapeValue } from "../utils";

export type XXssProtectionSpec =
  | {
      mode: "block";
    }
  | {
      mode: "disabled";
    }
  | {
      mode: "sanitize";
    }
  | {
      mode: "sanitize+report";
      reportUri: string;
    };

export function buildXXssProtectionValue(spec: XXssProtectionSpec): string {
  switch (spec.mode) {
    case "block":
      return "1; mode=block";
    case "disabled":
      return "0";
    case "sanitize":
      return "1";
    case "sanitize+report":
      return '"1; report=' + escapeValue(spec.reportUri) + '"';
  }
}
