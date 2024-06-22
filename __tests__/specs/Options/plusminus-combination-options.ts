import type { Options } from "../../../src";

export default {
  spec: {
    Options: {
      plus: ["All", "ExecCGI", "FollowSymLinks", "Includes"],
      minus: [
        "IncludesNOEXEC",
        "Indexes",
        "MultiViews",
        "SymLinksIfOwnerMatch",
      ],
    },
  },
} as Partial<Options>;
