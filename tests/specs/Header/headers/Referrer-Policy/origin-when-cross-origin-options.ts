import type { Options } from "../../../../../src";

const options: Partial<Options> = {
  spec: {
    Header: [
      {
        action: "set",
        header: "Referrer-Policy",
        value: "origin-when-cross-origin",
      },
    ],
  },
};

export default options;
