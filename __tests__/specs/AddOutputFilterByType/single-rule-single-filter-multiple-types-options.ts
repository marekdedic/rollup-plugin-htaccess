import type { Options } from "../../../src";

export default {
  spec: {
    AddOutputFilterByType: [
      {
        filters: ["DEFLATE"],
        mediaTypes: ["text/html", "text/plain", "application/javascript"],
      },
    ],
  },
} as Partial<Options>;
