import type { Options } from "../../../../src";

export default {
  spec: {
    Header: [
      {
        action: "set",
        header: "Content-Security-Policy",
        value: {
          // eslint-disable-next-line @typescript-eslint/naming-convention -- CSP Policy name
          "trusted-types": {},
        },
      },
    ],
  },
} as Partial<Options>;
