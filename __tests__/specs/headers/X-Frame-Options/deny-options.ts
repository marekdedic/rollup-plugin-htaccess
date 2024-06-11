import type { Options } from "../../../../src";

export default {
  headers: [
    {
      action: "set",
      header: "X-Frame-Options",
      value: "deny",
    },
  ],
} as Partial<Options>;
