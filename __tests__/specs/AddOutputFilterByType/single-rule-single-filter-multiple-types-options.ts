import type { Options } from "../../../src";

const options: Partial<Options> = {
  spec: {
    AddOutputFilterByType: [
      {
        filters: ["DEFLATE"],
        mediaTypes: ["text/html", "text/plain", "application/javascript"],
      },
    ],
  },
};

export default options;
