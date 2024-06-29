import type { Options } from "../../../../../src";

const options: Partial<Options> = {
  spec: {
    Header: [
      {
        action: "set",
        header: "Referrer-Policy",
        value: "no-referrer-when-downgrade",
      },
    ],
  },
};

export default options;
