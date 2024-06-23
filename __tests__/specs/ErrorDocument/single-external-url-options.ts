import type { Options } from "../../../src";

export default {
  spec: {
    ErrorDocument: {
      404: "https://site.example/uh-oh",
    },
  },
} as Partial<Options>;
