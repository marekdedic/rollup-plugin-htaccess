import type { Options } from "../../../src";

const options: Partial<Options> = {
  spec: {
    Header: [
      {
        action: "add",
        header: "X-Content-Type-Options",
        value: { nosniff: true },
      },
    ],
  },
};

export default options;
