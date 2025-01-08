import type { Options } from "../../../src";

const options: Partial<Options> = {
  spec: {
    rewrite: {
      rules: [
        {
          flags: {
            env: {
              value: "",
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
