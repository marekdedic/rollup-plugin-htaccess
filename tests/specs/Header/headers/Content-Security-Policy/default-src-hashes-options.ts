import type { Options } from "../../../../../src";

const options: Partial<Options> = {
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
};

export default options;
