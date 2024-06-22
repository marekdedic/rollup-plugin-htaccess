import type { Options } from "../../../../../src";

export default {
  spec: {
    Header: [
      {
        action: "set",
        header: "X-Xss-Protection",
        value: { mode: "disabled" },
      },
    ],
  },
} as Partial<Options>;
