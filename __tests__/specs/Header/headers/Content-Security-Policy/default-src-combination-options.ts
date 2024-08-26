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
              sha256: ["def", "ghi"],
            },
            hosts: ["https://site.example"],
            nonces: ["abc"],
            schemes: {
              data: true,
              filesystem: true,
            },
            "unsafe-eval": true,
            "unsafe-inline": true,
          },
        },
      },
    ],
  },
};

export default options;
