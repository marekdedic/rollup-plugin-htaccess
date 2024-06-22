import type { Options } from "../../../src";

export default {
  spec: {
    Options: {
      set: [
        "All",
        "ExecCGI",
        "FollowSymLinks",
        "Includes",
        "IncludesNOEXEC",
        "Indexes",
        "MultiViews",
        "SymLinksIfOwnerMatch",
      ],
    },
  },
} as Partial<Options>;
