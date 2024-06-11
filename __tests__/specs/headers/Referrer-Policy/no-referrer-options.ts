import type { Options } from "../../../../src";

export default {
  headers: [
    {
      action: "set",
      header: "Referrer-Policy",
      value: "no-referrer",
    },
  ],
} as Partial<Options>;
