import type { Options } from "../../src";

export default {
  headers: [
    {
      action: "note",
      header: "X-Content-Type-Options",
    },
  ],
} as Partial<Options>;
