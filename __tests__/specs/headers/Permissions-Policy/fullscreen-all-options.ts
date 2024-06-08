import type { Options } from "../../../../src";

export default {
  headers: [
    {
      action: "set",
      header: "Permissions-Policy",
      value: { fullscreen: "*" },
    },
  ],
} as Partial<Options>;
