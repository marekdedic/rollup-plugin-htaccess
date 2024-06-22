import type { Options } from "../../../../../src";

export default {
  spec: {
    Header: [
      {
        action: "set",
        header: "Content-Security-Policy",
        value: {
          "default-src": {
            hosts: ["https://site1.example", "http://site2.example"],
          },
        },
      },
    ],
  },
} as Partial<Options>;
