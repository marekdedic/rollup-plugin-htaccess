import type { Options } from "../../../../src";

export default {
  headers: [
    {
      action: "set",
      header: "Strict-Transport-Security",
      value: { maxAge: 42, includeSubDomains: true },
    },
  ],
} as Partial<Options>;
