import type { Options } from "../../../../src";

export default {
  headers: [
    {
      action: "set",
      header: "X-Frame-Options",
      value: "sameorigin",
    },
  ],
} as Partial<Options>;
