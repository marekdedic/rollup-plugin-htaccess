import type { Options } from "../../../src";

const options: Partial<Options> = {
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
};

export default options;
