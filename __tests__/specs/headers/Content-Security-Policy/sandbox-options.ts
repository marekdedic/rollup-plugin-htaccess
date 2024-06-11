import type { Options } from "../../../../src";

export default {
  headers: [
    {
      action: "set",
      header: "Content-Security-Policy",
      value: {
        sandbox: null,
      },
    },
  ],
} as Partial<Options>;
