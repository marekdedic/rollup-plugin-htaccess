import type { Options } from "../../../src";

const options: Partial<Options> = {
  spec: {
    ErrorDocument: {
      500: "/uh-oh",
    },
  },
};

export default options;
