import type { Options } from "../../../../src";

export default {
  spec: {
    Header: [
      {
        action: "set",
        header: "Referrer-Policy",
        value: "origin-when-cross-origin",
      },
    ],
  },
} as Partial<Options>;
