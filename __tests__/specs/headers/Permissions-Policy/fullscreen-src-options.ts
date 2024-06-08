import type { Options } from "../../../../src";

export default {
  headers: [
    {
      action: "set",
      header: "Permissions-Policy",
      value: { fullscreen: { src: true } },
    },
  ],
} as Partial<Options>;
