import type { Options } from "../../../src";

const options: Partial<Options> = {
  spec: {
    rewrite: {
      options: {
        AllowNoSlash: true,
      },
    },
  },
};

export default options;
