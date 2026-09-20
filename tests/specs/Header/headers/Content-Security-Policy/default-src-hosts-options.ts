import type { Options } from "../../../../../src";

const options: Partial<Options> = {
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
};

export default options;
