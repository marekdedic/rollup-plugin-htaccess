import type { Options } from "../../../src";

const options: Partial<Options> = {
  spec: {
    rewrite: {
      rules: [
        {
          flags: {
            BCTLS: true,
          },
          pattern: "foo",
          substitution: "bar",
        },
      ],
    },
  },
};

export default options;
