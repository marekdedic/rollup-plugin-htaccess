import type { Options } from "../../../../../src";

const options: Partial<Options> = {
  spec: {
    Header: [
      {
        action: "set",
        header: "Permissions-Policy",
        value: {
          fullscreen: {
            origins: [
              "https://site1.example",
              "http://site2.example",
              "https://site3.example",
            ],
          },
        },
      },
    ],
  },
};

export default options;
