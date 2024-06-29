import type { Options } from "../../../src";

const options: Partial<Options> = {
  spec: {
    Header: [
      {
        action: "set",
        header: "X-Content-Type-Options",
        value: { nosniff: true },
        condition: {
          envVar: "MY_VAR",
          requireUnset: true,
        },
      },
    ],
  },
};

export default options;
