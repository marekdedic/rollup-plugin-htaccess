import type { Options } from "../../../../src";

export default {
  headers: [
    {
      action: "set",
      header: "Content-Security-Policy",
      value: {
        /* eslint-disable @typescript-eslint/naming-convention -- CSP Policy values */
        "trusted-types": {
          policies: ["abc", "def"],
          "allow-duplicates": true,
        },
        /* eslint-enable */
      },
    },
  ],
} as Partial<Options>;
