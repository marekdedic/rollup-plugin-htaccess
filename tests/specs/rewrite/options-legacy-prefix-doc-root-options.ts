import type { Options } from "../../../src";

const options: Partial<Options> = {
  spec: {
    rewrite: {
      options: {
        LegacyPrefixDocRoot: true,
      },
    },
  },
};

export default options;
