import type { Options } from "../../../src";

export default {
  spec: {
    ErrorDocument: {
      401: "This is forbidden!",
    },
  },
} as Partial<Options>;
