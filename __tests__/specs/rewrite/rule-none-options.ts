import type { Options } from "../../../src";

export default {
  spec: {
    rewrite: {
      rules: [
        {
          pattern: "foo",
          substitution: null,
        },
      ],
    },
  },
} as Partial<Options>;
