import type { Options } from "../../../src";

const options: Partial<Options> = {
  spec: {
    rewrite: {
      options: {
        InheritDownBefore: true,
      },
    },
  },
};

export default options;
