import type { Options } from "../../../../../src";

const options: Partial<Options> = {
  spec: {
    Header: [
      {
        action: "set",
        header: "Strict-Transport-Security",
        value: { includeSubDomains: true, maxAge: 31536000, preload: true },
      },
    ],
  },
};

export default options;
