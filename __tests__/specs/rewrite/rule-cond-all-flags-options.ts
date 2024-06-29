import type { Options } from "../../../src";

const options: Partial<Options> = {
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
                ornext: true,
                novary: true,
              },
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
