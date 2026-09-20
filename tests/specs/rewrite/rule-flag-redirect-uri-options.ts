import type { Options } from "../../../src";

const options: Partial<Options> = {
  spec: {
    rewrite: {
      rules: [
        {
          flags: {
            redirect: "https://example.test",
          },
          pattern: "foo",
          substitution: "bar",
        },
      ],
    },
  },
};

export default options;
