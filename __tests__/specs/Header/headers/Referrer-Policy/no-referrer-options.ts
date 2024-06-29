import type { Options } from "../../../../../src";

const options: Partial<Options> = {
  spec: {
    Header: [
      {
        action: "set",
        header: "Referrer-Policy",
        value: "no-referrer",
      },
    ],
  },
};

export default options;
