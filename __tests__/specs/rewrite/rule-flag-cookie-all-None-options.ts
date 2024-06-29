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
              lifetime: 60,
              path: "/folder",
              secure: true,
              httponly: true,
              samesite: "None",
            },
          },
        },
      ],
    },
  },
};

export default options;
