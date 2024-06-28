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
            },
          ],
          pattern: "foo",
          substitution: "bar",
        },
      ],
    },
  },
} as Partial<Options>;
