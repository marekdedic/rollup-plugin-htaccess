import type { Options } from "../../../../../src";

const options: Partial<Options> = {
  spec: {
    Header: [
      {
        action: "set",
        header: "Content-Security-Policy",
        value: {
          "default-src": {
            schemes: {
              blob: true,
              data: true,
            },
          },
        },
      },
    ],
  },
};

export default options;
