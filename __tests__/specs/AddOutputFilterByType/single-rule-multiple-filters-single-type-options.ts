import type { Options } from "../../../src";

export default {
  spec: {
    AddOutputFilterByType: [
      {
        filters: ["INCLUDES", "DEFLATE"],
        mediaTypes: ["text/html"],
      },
    ],
  },
} as Partial<Options>;
