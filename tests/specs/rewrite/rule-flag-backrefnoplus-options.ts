import type { Options } from "../../../src";

const options: Partial<Options> = {
  spec: {
    rewrite: {
      rules: [
        {
          flags: {
            backrefnoplus: true,
          },
          pattern: "foo",
          substitution: "bar",
        },
      ],
    },
  },
};

export default options;
