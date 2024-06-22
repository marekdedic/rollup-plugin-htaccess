import type { Options } from "../../../../../src";

export default {
  spec: {
    Header: [
      {
        action: "set",
        header: "Referrer-Policy",
        value: "no-referrer",
      },
    ],
  },
} as Partial<Options>;
