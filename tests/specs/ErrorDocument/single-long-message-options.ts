import type { Options } from "../../../src";

const options: Partial<Options> = {
  spec: {
    ErrorDocument: {
      401: "This is forbidden!",
    },
  },
};

export default options;
