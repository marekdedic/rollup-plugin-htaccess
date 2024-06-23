import type { Options } from "../../../src";

export default {
  spec: {
    AddOutputFilterByType: [
      {
        filters: ["DEFLATE"],
        mediaTypes: ["text/html"],
      },
      {
        filters: ["INCLUDES"],
        mediaTypes: ["text/plain"],
      },
      {
        filters: ["INCLUDES"],
        mediaTypes: ["application/javascript"],
      },
    ],
  },
} as Partial<Options>;
