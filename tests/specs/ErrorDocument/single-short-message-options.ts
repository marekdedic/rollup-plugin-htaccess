import type { Options } from "../../../src";

const options: Partial<Options> = {
  spec: {
    ErrorDocument: {
      403: "Forbidden!",
    },
  },
};

export default options;
