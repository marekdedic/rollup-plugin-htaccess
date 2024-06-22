import type { Options } from "../../../../src";

export default {
  spec: {
    Header: [
      {
        action: "set",
        header: "Content-Security-Policy",
        value: {
          sandbox: "allow-scripts",
        },
      },
    ],
  },
} as Partial<Options>;
