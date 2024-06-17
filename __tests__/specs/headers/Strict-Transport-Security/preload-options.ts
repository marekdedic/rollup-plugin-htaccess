import type { Options } from "../../../../src";

export default {
  headers: [
    {
      action: "set",
      header: "Strict-Transport-Security",
      value: { maxAge: 31536000, includeSubDomains: true, preload: true },
    },
  ],
} as Partial<Options>;