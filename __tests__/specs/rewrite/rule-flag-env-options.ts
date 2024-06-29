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
              value: "val1",
            },
          },
        },
      ],
    },
  },
};

export default options;
