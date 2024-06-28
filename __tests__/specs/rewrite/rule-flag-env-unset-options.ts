import type { Options } from "../../../src";

export default {
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
} as Partial<Options>;
