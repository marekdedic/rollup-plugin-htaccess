import type { Options } from "../../../src";

export default {
  spec: {
    rewrite: {
      rules: [
        {
          conditions: [
            {
              testString: "%{HTTP_USER_AGENT}",
              conditionPattern: "=This Robot/1.0",
              flags: {
                nocase: true,
              },
            },
          ],
          pattern: "foo",
          substitution: "bar",
        },
      ],
    },
  },
} as Partial<Options>;
