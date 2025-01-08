import type { Options } from "../../../src";

const options: Partial<Options> = {
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
};

export default options;
