import type { Options } from "../../../src";

const options: Partial<Options> = {
  spec: {
    rewrite: {
      rules: [
        {
          flags: {
            type: "text/plain",
          },
          pattern: "foo",
          substitution: null,
        },
      ],
    },
  },
};

export default options;
