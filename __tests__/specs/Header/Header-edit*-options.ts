import type { Options } from "../../../src";

const options: Partial<Options> = {
  spec: {
    Header: [
      {
        action: "edit*",
        header: "X-Content-Type-Options",
        value: "oldVal",
        replacement: "newVal",
      },
    ],
  },
};

export default options;
