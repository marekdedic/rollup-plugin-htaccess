import type { Options } from "../../../src";

const options: Partial<Options> = {
  spec: {
    Header: [
      {
        action: "set",
        condition: {
          envVar: "MY_VAR",
        },
        header: "X-Content-Type-Options",
        value: { nosniff: true },
      },
    ],
  },
};

export default options;
