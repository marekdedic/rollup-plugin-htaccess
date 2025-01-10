import type { Options } from "../../../src";

const options: Partial<Options> = {
  spec: {
    rewrite: {
      rules: [
        {
          flags: {},
          pattern: "foo",
          substitution: "bar",
        },
      ],
    },
  },
};

export default options;
