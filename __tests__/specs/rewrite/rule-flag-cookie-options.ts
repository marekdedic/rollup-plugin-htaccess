import type { Options } from "../../../src";

const options: Partial<Options> = {
  spec: {
    rewrite: {
      rules: [
        {
          pattern: "foo",
          substitution: "bar",
          flags: {
            cookie: {
              name: "cookie1",
              value: "val1",
              domain: "example.test",
            },
          },
        },
      ],
    },
  },
};

export default options;
