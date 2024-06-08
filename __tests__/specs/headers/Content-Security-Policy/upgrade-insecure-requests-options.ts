import type { Options } from "../../../../src";

export default {
  headers: [
    {
      action: "set",
      header: "Content-Security-Policy",
      /* eslint-disable @typescript-eslint/naming-convention -- CSP Policy names */
      value: {
        "default-src": {
          self: true,
        },
        "upgrade-insecure-requests": true,
      },
      /* eslint-enable */
    },
  ],
} as Partial<Options>;
