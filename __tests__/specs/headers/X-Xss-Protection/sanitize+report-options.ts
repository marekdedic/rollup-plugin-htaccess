import type { Options } from "../../../../src";

export default {
  headers: [
    {
      action: "set",
      header: "X-Xss-Protection",
      value: { mode: "sanitize", reportUri: "https://report-uri.example" },
    },
  ],
} as Partial<Options>;
