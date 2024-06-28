import type { Options } from "../../../src";

export default {
  spec: {
    rewrite: {
      rules: [
        {
          pattern: "foo",
          substitution: null,
          flags: {
            type: "text/plain",
          },
        },
      ],
    },
  },
} as Partial<Options>;
