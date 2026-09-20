import type { Options } from "../../../src";

const options: Partial<Options> = {
  spec: {
    rewrite: {
      rules: [
        {
          conditions: [
            {
              conditionPattern: "=This Robot/1.0",
              flags: {
                ornext: true,
              },
              testString: "%{HTTP_USER_AGENT}",
            },
            {
              conditionPattern: "^host1",
              testString: "%{REMOTE_HOST}",
            },
          ],
          pattern: "foo",
          substitution: "bar",
        },
        {
          conditions: [
            {
              conditionPattern: "^host2",
              testString: "%{REMOTE_HOST}",
            },
          ],
          flags: {
            B: true,
            type: "text/plain",
          },
          pattern: "baz",
          substitution: null,
        },
      ],
    },
  },
};

export default options;
