import type { Options } from "../../../../src";

export default {
  spec: {
    Header: [
      {
        action: "set",
        header: "Strict-Transport-Security",
        value: { maxAge: 31536000, preload: true },
      },
    ],
  },
} as Partial<Options>;
