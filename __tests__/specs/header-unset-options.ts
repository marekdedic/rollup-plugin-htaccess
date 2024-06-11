import type { Options } from "../../src";

export default {
  headers: [
    {
      action: "unset",
      header: "X-Content-Type-Options",
    },
  ],
} as Partial<Options>;
