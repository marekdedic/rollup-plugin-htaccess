import type { Options } from "../../../../src";

export default {
  spec: {
    Header: [
      {
        action: "set",
        header: "Content-Security-Policy",
        value: {
          "default-src": {
            self: true,
          },
          "upgrade-insecure-requests": true,
        },
      },
    ],
  },
} as Partial<Options>;
