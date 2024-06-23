import type { Options } from "../../../src";

export default {
  spec: {
    ErrorDocument: {
      401: "This is forbidden!",
      403: "Forbidden!",
      404: "https://site.example/uh-oh",
      500: "/uh-oh",
    },
  },
} as Partial<Options>;
