import type { Options } from "../../../src";

const options: Partial<Options> = {
  spec: {
    rewrite: {
      rules: [
        {
          flags: {
            cookie: {
              domain: "example.test",
              name: "cookie1",
              value: "val1",
            },
          },
          pattern: "foo",
          substitution: "bar",
        },
      ],
    },
  },
};

export default options;
