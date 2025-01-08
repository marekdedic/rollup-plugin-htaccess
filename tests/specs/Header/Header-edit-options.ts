import type { Options } from "../../../src";

const options: Partial<Options> = {
  spec: {
    Header: [
      {
        action: "edit",
        header: "X-Content-Type-Options",
        replacement: "newVal",
        value: "oldVal",
      },
    ],
  },
};

export default options;
