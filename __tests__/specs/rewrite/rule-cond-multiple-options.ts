import type { Options } from "../../../src";

const options: Partial<Options> = {
  spec: {
    rewrite: {
      rules: [
        {
          conditions: [
            {
              conditionPattern: "=This Robot/1.0",
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
      ],
    },
  },
};

export default options;
