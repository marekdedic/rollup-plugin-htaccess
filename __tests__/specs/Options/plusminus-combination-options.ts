import type { Options } from "../../../src";

const options: Partial<Options> = {
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
};

export default options;
