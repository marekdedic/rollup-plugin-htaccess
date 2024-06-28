import type { Options } from "../../../src";

export default {
  spec: {
    rewrite: {
      rules: [
        {
          pattern: "foo",
          substitution: "bar",
          conditions: [
            {
              testString: "%{HTTP_USER_AGENT}",
              conditionPattern: "=This Robot/1.0",
              flags: {
                ornext: true,
              },
            },
            {
              testString: "%{REMOTE_HOST}",
              conditionPattern: "^host1",
            },
          ],
        },
        {
          pattern: "baz",
          substitution: null,
          conditions: [
            {
              testString: "%{REMOTE_HOST}",
              conditionPattern: "^host2",
            },
          ],
          flags: {
            B: true,
            type: "text/plain",
          },
        },
      ],
    },
  },
} as Partial<Options>;
