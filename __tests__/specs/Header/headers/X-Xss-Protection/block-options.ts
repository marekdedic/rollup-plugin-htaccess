import type { Options } from "../../../../../src";

const options: Partial<Options> = {
  spec: {
    Header: [
      {
        action: "set",
        header: "X-Xss-Protection",
        value: { mode: "block" },
      },
    ],
  },
};

export default options;
