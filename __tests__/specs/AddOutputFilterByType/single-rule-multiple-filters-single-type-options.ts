import type { Options } from "../../../src";

const options: Partial<Options> = {
  spec: {
    AddOutputFilterByType: [
      {
        filters: ["INCLUDES", "DEFLATE"],
        mediaTypes: ["text/html"],
      },
    ],
  },
};

export default options;
