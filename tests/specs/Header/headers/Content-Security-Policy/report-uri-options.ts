import type { Options } from "../../../../../src";

const options: Partial<Options> = {
  spec: {
    Header: [
      {
        action: "set",
        header: "Content-Security-Policy",
        value: {
          // eslint-disable-next-line @typescript-eslint/no-deprecated -- testing deprecated option
          "report-uri": ["https://report-uri.example", "http://site2.example"],
        },
      },
    ],
  },
};

export default options;
