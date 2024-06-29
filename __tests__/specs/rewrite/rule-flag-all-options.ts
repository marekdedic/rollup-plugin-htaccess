import type { Options } from "../../../src";

const options: Partial<Options> = {
  spec: {
    rewrite: {
      rules: [
        {
          pattern: "foo",
          substitution: null,
          flags: {
            B: true,
            backrefnoplus: true,
            BCTLS: true,
            BNE: "#;",
            chain: true,
            cookie: {
              name: "cookie1",
              value: "cookieval1",
              domain: "example.test",
            },
            discardpath: true,
            END: true,
            forbidden: true,
            gone: true,
            last: true,
            next: true,
            nocase: true,
            noescape: true,
            nosubreq: true,
            proxy: true,
            qsappend: true,
            qsdiscard: true,
            qslast: true,
            redirect: 301,
            skip: 2,
            UnsafeAllow3F: true,
            UnsafePrefixStat: true,
            env: {
              variable: "varname",
              value: "val1",
            },
            handler: "application/x-httpd-php",
            type: "text/plain",
          },
        },
      ],
    },
  },
};

export default options;
