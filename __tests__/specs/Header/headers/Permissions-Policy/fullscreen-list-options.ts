import type { Options } from "../../../../../src";

export default {
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
} as Partial<Options>;
