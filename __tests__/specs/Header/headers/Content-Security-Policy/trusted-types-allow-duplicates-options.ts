import type { Options } from "../../../../../src";

const options: Partial<Options> = {
  spec: {
    Header: [
      {
        action: "set",
        header: "Content-Security-Policy",
        value: {
          "trusted-types": {
            "allow-duplicates": true,
            policies: ["abc", "def"],
          },
        },
      },
    ],
  },
};

export default options;
