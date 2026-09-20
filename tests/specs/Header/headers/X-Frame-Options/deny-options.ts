import type { Options } from "../../../../../src";

const options: Partial<Options> = {
  spec: {
    Header: [
      {
        action: "set",
        header: "X-Frame-Options",
        value: "deny",
      },
    ],
  },
};

export default options;
