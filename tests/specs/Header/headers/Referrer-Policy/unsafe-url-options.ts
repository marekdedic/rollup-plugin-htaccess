import type { Options } from "../../../../../src";

const options: Partial<Options> = {
  spec: {
    Header: [
      {
        action: "set",
        header: "Referrer-Policy",
        value: "unsafe-url",
      },
    ],
  },
};

export default options;
