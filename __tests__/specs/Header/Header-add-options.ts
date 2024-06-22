import type { Options } from "../../../src";

export default {
  spec: {
    Header: [
      {
        action: "add",
        header: "X-Content-Type-Options",
        value: { nosniff: true },
      },
    ],
  },
} as Partial<Options>;
