import type { Options } from "../../../src";

const options: Partial<Options> = {
  spec: {
    rewrite: {
      options: {
        MergeBase: true,
      },
    },
  },
};

export default options;
