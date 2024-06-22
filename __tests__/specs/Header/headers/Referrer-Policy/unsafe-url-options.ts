import type { Options } from "../../../../../src";

export default {
  spec: {
    Header: [
      {
        action: "set",
        header: "Referrer-Policy",
        value: "unsafe-url",
      },
    ],
  },
} as Partial<Options>;
