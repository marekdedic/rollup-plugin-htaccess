import type { Options } from "../../../../src";

export default {
  spec: {
    Header: [
      {
        action: "set",
        header: "Content-Security-Policy",
        /* eslint-disable @typescript-eslint/naming-convention -- CSP Policy values */
        value: {
          "trusted-types": {
            policies: ["abc", "def"],
            "allow-duplicates": true,
          },
        },
        /* eslint-enable */
      },
    ],
  },
} as Partial<Options>;
