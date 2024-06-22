import type { Options } from "../../src";

export default {
  spec: {
    Header: [
      {
        action: "unset",
        header: "X-Content-Type-Options",
      },
    ],
  },
} as Partial<Options>;
