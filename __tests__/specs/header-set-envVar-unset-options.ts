import type { Options } from "../../src";

export default {
  headers: [
    {
      action: "set",
      header: "X-Content-Type-Options",
      value: { nosniff: true },
      condition: {
        envVar: "MY_VAR",
        requireUnset: true,
      },
    },
  ],
} as Partial<Options>;
