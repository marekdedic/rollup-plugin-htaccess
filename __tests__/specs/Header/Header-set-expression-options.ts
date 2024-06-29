import type { Options } from "../../../src";

const options: Partial<Options> = {
  spec: {
    Header: [
      {
        action: "set",
        header: "X-Content-Type-Options",
        value: { nosniff: true },
        condition: {
          expression: "%{md5:foo}",
        },
      },
    ],
  },
};

export default options;
