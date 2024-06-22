import type { Options } from "../../../../src";

export default {
  spec: {
    Header: [
      {
        action: "set",
        header: "Content-Security-Policy",
        value: {
          "report-uri": ["https://report-uri.example", "http://site2.example"],
        },
      },
    ],
  },
} as Partial<Options>;
