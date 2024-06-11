import type { Options } from "../../../../src";

export default {
  headers: [
    {
      action: "set",
      header: "Content-Security-Policy",
      value: {
        /* eslint-disable @typescript-eslint/naming-convention -- CSP Policy name */
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
        /* eslint-enable */
      },
    },
  ],
} as Partial<Options>;
