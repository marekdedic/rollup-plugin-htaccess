import type { Options } from "../../../src";

export default {
  spec: {
    rewrite: {
      rules: [
        {
          pattern: "foo",
          substitution: "bar",
          flags: {
            redirect: 301,
          },
        },
      ],
    },
  },
} as Partial<Options>;
