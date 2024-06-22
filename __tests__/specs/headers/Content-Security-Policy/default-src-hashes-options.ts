import type { Options } from "../../../../src";

export default {
  spec: {
    Header: [
      {
        action: "set",
        header: "Content-Security-Policy",
        value: {
          "default-src": {
            hashes: {
              sha256: ["test", "abc"],
              sha512: ["def"],
            },
          },
        },
      },
    ],
  },
} as Partial<Options>;
