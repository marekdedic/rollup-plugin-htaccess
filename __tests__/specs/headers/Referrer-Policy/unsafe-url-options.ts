import type { Options } from "../../../../src";

export default {
  headers: [
    {
      action: "set",
      header: "Referrer-Policy",
      value: "unsafe-url",
    },
  ],
} as Partial<Options>;
