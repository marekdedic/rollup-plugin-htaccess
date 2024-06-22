import type { Options } from "../../../../../src";

export default {
  spec: {
    Header: [
      {
        action: "set",
        header: "Permissions-Policy",
        value: { fullscreen: "*" },
      },
    ],
  },
} as Partial<Options>;
