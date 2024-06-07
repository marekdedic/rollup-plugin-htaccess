import type { Options } from "../../src";

export default {
  headers: [
    {
      action: "echo",
      header: "X-Content-Type-Options",
    },
  ],
} as Partial<Options>;
