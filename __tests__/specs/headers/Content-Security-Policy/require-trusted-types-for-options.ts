import type { Options } from "../../../../src";

export default {
  spec: {
    Header: [
      {
        action: "set",
        header: "Content-Security-Policy",
        value: {
          "require-trusted-types-for": "script",
        },
      },
    ],
  },
} as Partial<Options>;
