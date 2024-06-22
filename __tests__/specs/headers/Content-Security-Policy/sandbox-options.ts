import type { Options } from "../../../../src";

export default {
  spec: {
    Header: [
      {
        action: "set",
        header: "Content-Security-Policy",
        value: {
          sandbox: null,
        },
      },
    ],
  },
} as Partial<Options>;
