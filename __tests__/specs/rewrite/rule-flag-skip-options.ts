import type { Options } from "../../../src";

export default {
  spec: {
    rewrite: {
      rules: [
        {
          pattern: "foo",
          substitution: "bar",
          flags: {
            skip: 3,
          },
        },
      ],
    },
  },
} as Partial<Options>;
