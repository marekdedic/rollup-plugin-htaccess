import type { Options } from "../../../src";

const options: Partial<Options> = {
  spec: {
    Options: {
      minus: [
        "IncludesNOEXEC",
        "Indexes",
        "MultiViews",
        "SymLinksIfOwnerMatch",
      ],
      plus: ["All", "ExecCGI", "FollowSymLinks", "Includes"],
    },
  },
};

export default options;
