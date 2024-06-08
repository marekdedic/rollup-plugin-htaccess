import type { Options } from "../../../../src";

export default {
  headers: [
    {
      action: "set",
      header: "Referrer-Policy",
      value: "same-origin",
    },
  ],
} as Partial<Options>;
