import type { Options } from "../../../src";

const options: Partial<Options> = {
  spec: {
    rewrite: {
      rules: [
        {
          flags: {
            handler: "application/x-httpd-php",
          },
          pattern: "foo",
          substitution: null,
        },
      ],
    },
  },
};

export default options;
