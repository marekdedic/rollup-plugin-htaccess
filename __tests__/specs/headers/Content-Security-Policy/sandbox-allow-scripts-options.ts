import type { Options } from "../../../../src";

export default {
  headers: [
    {
      action: "set",
      header: "Content-Security-Policy",
      value: {
        sandbox: "allow-scripts",
      },
    },
  ],
} as Partial<Options>;
