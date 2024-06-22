import type { Options } from "../../../../src";

export default {
  spec: {
    Header: [
      {
        action: "set",
        header: "Content-Security-Policy",
        value: {
          // eslint-disable-next-line @typescript-eslint/naming-convention -- CSP Policy name
          "report-uri": ["https://report-uri.example", "http://site2.example"],
        },
      },
    ],
  },
} as Partial<Options>;
