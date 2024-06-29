import type { Options } from "../../../../../src";

const options: Partial<Options> = {
  spec: {
    Header: [
      {
        action: "set",
        header: "Strict-Transport-Security",
        value: { maxAge: 31536000, includeSubDomains: true, preload: true },
      },
    ],
  },
};

export default options;
