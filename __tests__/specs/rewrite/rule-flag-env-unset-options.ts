import type { Options } from "../../../src";

const options: Partial<Options> = {
  spec: {
    rewrite: {
      rules: [
        {
          pattern: "foo",
          substitution: null,
          flags: {
            env: {
              variable: "varname",
              value: null,
            },
          },
        },
      ],
    },
  },
};

export default options;
