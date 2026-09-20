import type { Options } from "../../../src";

const options: Partial<Options> = {
  spec: {
    rewrite: {
      options: {
        InheritDown: true,
      },
    },
  },
};

export default options;
