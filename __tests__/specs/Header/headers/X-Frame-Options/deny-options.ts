import type { Options } from "../../../../../src";

export default {
  spec: {
    Header: [
      {
        action: "set",
        header: "X-Frame-Options",
        value: "deny",
      },
    ],
  },
} as Partial<Options>;
