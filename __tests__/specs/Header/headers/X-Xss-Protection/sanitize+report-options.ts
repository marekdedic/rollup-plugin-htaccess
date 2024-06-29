import type { Options } from "../../../../../src";

const options: Partial<Options> = {
  spec: {
    Header: [
      {
        action: "set",
        header: "X-Xss-Protection",
        value: { mode: "sanitize", reportUri: "https://report-uri.example" },
      },
    ],
  },
};

export default options;
