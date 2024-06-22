import type { Options } from "../../../src";

export default {
  spec: {
    Header: [
      {
        action: "edit",
        header: "X-Content-Type-Options",
        value: "oldVal",
        replacement: "newVal",
      },
    ],
  },
} as Partial<Options>;
