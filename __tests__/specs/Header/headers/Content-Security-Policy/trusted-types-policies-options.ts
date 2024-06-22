import type { Options } from "../../../../../src";

export default {
  spec: {
    Header: [
      {
        action: "set",
        header: "Content-Security-Policy",
        value: {
          "trusted-types": {
            policies: ["abc", "def"],
          },
        },
      },
    ],
  },
} as Partial<Options>;
