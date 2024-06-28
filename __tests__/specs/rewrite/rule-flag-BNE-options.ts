import type { Options } from "../../../src";

export default {
  spec: {
    rewrite: {
      rules: [
        {
          pattern: "foo",
          substitution: "bar",
          flags: {
            BNE: "#?;",
          },
        },
      ],
    },
  },
} as Partial<Options>;
