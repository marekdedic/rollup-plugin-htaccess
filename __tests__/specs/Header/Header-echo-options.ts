import type { Options } from "../../../src";

export default {
  spec: {
    Header: [
      {
        action: "echo",
        header: "X-Content-Type-Options",
      },
    ],
  },
} as Partial<Options>;
