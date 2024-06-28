import type { Options } from "../../../src";

export default {
  spec: {
    rewrite: {
      rules: [
        {
          pattern: "foo",
          substitution: "bar",
          flags: {
            UnsafeAllow3F: true,
          },
        },
      ],
    },
  },
} as Partial<Options>;
