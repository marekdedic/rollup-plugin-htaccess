import type { Options } from "../../../../src";

export default {
  spec: {
    Header: [
      {
        action: "set",
        header: "Referrer-Policy",
        value: "strict-origin",
      },
    ],
  },
} as Partial<Options>;
