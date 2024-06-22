import type { Options } from "../../../../src";

export default {
  spec: {
    Header: [
      {
        action: "set",
        header: "Content-Security-Policy",
        /* eslint-disable @typescript-eslint/naming-convention -- CSP Policy name */
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
        /* eslint-enable */
      },
    ],
  },
} as Partial<Options>;
