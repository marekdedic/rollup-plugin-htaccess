import type { Options } from "../../../../src";

export default {
  headers: [
    {
      action: "set",
      header: "Referrer-Policy",
      value: "strict-origin-when-cross-origin",
    },
  ],
} as Partial<Options>;
