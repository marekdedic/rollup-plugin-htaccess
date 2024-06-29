import type { Options } from "../../../src";

const options: Partial<Options> = {
  spec: {
    Header: [
      {
        action: "note",
        header: "X-Content-Type-Options",
      },
    ],
  },
};

export default options;
