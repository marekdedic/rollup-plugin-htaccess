import type { Options } from "../../../src";

export default {
  spec: {
    AddOutputFilterByType: [
      {
        filters: ["DEFLATE"],
        mediaTypes: ["text/html"],
      },
    ],
  },
} as Partial<Options>;
