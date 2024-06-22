import type { Options } from "../../../../src";

export default {
  spec: {
    Header: [
      {
        action: "set",
        header: "Content-Security-Policy",
        value: {
          "default-src": {
            schemes: {
              data: true,
              blob: true,
            },
          },
        },
      },
    ],
  },
} as Partial<Options>;
