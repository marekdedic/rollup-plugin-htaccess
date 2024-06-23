import type { Options } from "../../../src";

export default {
  spec: {
    ErrorDocument: {
      500: "/uh-oh",
    },
  },
} as Partial<Options>;
