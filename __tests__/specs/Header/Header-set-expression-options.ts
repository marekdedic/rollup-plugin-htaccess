import type { Options } from "../../../src";

const options: Partial<Options> = {
  spec: {
    Header: [
      {
        action: "set",
        condition: {
          expression: "%{md5:foo}",
        },
        header: "X-Content-Type-Options",
        value: { nosniff: true },
      },
    ],
  },
};

export default options;
