import type { Options } from "../../../src";

const options: Partial<Options> = {
  spec: {
    rewrite: {
      rules: [
        {
          pattern: "foo",
          substitution: "bar",
          flags: {
            UnsafePrefixStat: true,
          },
        },
      ],
    },
  },
};

export default options;
