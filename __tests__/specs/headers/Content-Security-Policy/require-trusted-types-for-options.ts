import type { Options } from "../../../../src";

export default {
  headers: [
    {
      action: "set",
      header: "Content-Security-Policy",
      value: {
        // eslint-disable-next-line @typescript-eslint/naming-convention -- CSP Policy name
        "require-trusted-types-for": "script",
      },
    },
  ],
} as Partial<Options>;
