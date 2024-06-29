import type { Options } from "../../../src";

const options: Partial<Options> = {
  spec: {
    ErrorDocument: {
      404: "https://site.example/uh-oh",
    },
  },
};

export default options;
