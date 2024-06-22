import type { Options } from "../../../../src";

export default {
  spec: {
    Header: [
      {
        action: "set",
        header: "X-Xss-Protection",
        value: { mode: "sanitize" },
      },
    ],
  },
} as Partial<Options>;
