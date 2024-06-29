import type { Options } from "../../../src";

const options: Partial<Options> = {
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
};

export default options;
