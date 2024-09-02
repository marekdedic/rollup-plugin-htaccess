import type { Options } from "../../../src";

const options: Partial<Options> = {
  spec: {
    rewrite: {
      rules: [
        {
          flags: {
            cookie: {
              domain: "example.test",
              httponly: true,
              lifetime: 60,
              name: "cookie1",
              path: "/folder",
              samesite: "Lax",
              secure: true,
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
