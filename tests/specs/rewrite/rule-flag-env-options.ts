import type { Options } from "../../../src";

const options: Partial<Options> = {
  spec: {
    rewrite: {
      rules: [
        {
          flags: {
            env: {
              value: "val1",
              variable: "varname",
            },
          },
          pattern: "foo",
          substitution: null,
        },
      ],
    },
  },
};

export default options;
