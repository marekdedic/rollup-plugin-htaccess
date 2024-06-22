import type { Options } from "../../../../src";

export default {
  spec: {
    Header: [
      {
        action: "set",
        header: "Content-Security-Policy",
        value: {
          "report-to": "abc",
        },
      },
    ],
  },
} as Partial<Options>;
