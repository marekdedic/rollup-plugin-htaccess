import type { Options } from "../../src";

export default {
  headers: [
    {
      action: "edit*",
      header: "X-Content-Type-Options",
      value: "oldVal",
      replacement: "newVal",
    },
  ],
} as Partial<Options>;
