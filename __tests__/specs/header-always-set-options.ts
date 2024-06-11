import type { Options } from "../../src";

export default {
  headers: [
    {
      action: "set",
      header: "X-Content-Type-Options",
      value: { nosniff: true },
      always: true,
    },
  ],
} as Partial<Options>;
