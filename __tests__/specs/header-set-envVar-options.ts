import type { Options } from "../../src";

export default {
  spec: {
    Header: [
      {
        action: "set",
        header: "X-Content-Type-Options",
        value: { nosniff: true },
        condition: {
          envVar: "MY_VAR",
        },
      },
    ],
  },
} as Partial<Options>;
