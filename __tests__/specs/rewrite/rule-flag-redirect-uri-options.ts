import type { Options } from "../../../src";

export default {
  spec: {
    rewrite: {
      rules: [
        {
          pattern: "foo",
          substitution: "bar",
          flags: {
            redirect: "https://example.test",
          },
        },
      ],
    },
  },
} as Partial<Options>;
