import type { Options } from "../../../../../src";

const options: Partial<Options> = {
  spec: {
    Header: [
      {
        action: "set",
        header: "Permissions-Policy",
        value: { fullscreen: "*" },
      },
    ],
  },
};

export default options;
