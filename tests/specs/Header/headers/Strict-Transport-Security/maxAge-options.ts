import type { Options } from "../../../../../src";

const options: Partial<Options> = {
  spec: {
    Header: [
      {
        action: "set",
        header: "Strict-Transport-Security",
        value: { maxAge: 42 },
      },
    ],
  },
};

export default options;
