import type { Options } from "../../../src";

export default {
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
} as Partial<Options>;
