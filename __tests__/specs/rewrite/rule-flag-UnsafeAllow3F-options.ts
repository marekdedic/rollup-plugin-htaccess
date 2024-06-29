import type { Options } from "../../../src";

const options: Partial<Options> = {
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
};

export default options;
