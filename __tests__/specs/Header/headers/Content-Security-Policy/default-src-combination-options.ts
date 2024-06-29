import type { Options } from "../../../../../src";

const options: Partial<Options> = {
  spec: {
    Header: [
      {
        action: "set",
        header: "Content-Security-Policy",
        value: {
          "default-src": {
            hosts: ["https://site.example"],
            schemes: {
              data: true,
              filesystem: true,
            },
            "unsafe-eval": true,
            "unsafe-inline": true,
            nonces: ["abc"],
            hashes: {
              sha256: ["def", "ghi"],
            },
          },
        },
      },
    ],
  },
};

export default options;
