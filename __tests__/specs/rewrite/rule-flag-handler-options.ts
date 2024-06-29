import type { Options } from "../../../src";

const options: Partial<Options> = {
  spec: {
    rewrite: {
      rules: [
        {
          pattern: "foo",
          substitution: null,
          flags: {
            handler: "application/x-httpd-php",
          },
        },
      ],
    },
  },
};

export default options;
