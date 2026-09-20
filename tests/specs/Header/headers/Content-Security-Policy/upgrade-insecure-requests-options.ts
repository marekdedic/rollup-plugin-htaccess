import type { Options } from "../../../../../src";

const options: Partial<Options> = {
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
};

export default options;
