import type { Options } from "../../../src";

const options: Partial<Options> = {
  spec: {
    rewrite: {
      options: {
        AllowAnyURI: true,
      },
    },
  },
};

export default options;
