import type { Options } from "../../../src";

const options: Partial<Options> = {
  spec: {
    rewrite: {
      rules: [
        {
          flags: {
            B: true,
            backrefnoplus: true,
            BCTLS: true,
            BNE: "#;",
            chain: true,
            cookie: {
              domain: "example.test",
              name: "cookie1",
              value: "cookieval1",
            },
            discardpath: true,
            END: true,
            env: {
              value: "val1",
              variable: "varname",
            },
            forbidden: true,
            gone: true,
            handler: "application/x-httpd-php",
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
            type: "text/plain",
            UnsafeAllow3F: true,
            UnsafePrefixStat: true,
          },
          pattern: "foo",
          substitution: null,
        },
      ],
    },
  },
};

export default options;
