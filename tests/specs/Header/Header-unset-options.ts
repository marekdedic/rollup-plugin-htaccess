import type { Options } from "../../../src";

const options: Partial<Options> = {
  spec: {
    Header: [
      {
        action: "unset",
        header: "X-Content-Type-Options",
      },
    ],
  },
};

export default options;
