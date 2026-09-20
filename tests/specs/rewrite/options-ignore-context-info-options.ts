import type { Options } from "../../../src";

const options: Partial<Options> = {
  spec: {
    rewrite: {
      options: {
        IgnoreContextInfo: true,
      },
    },
  },
};

export default options;
