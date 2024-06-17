import type { Options } from "../../../../src";

export default {
  headers: [
    {
      action: "set",
      header: "Permissions-Policy",
      value: {
        fullscreen: {
          src: true,
          self: true,
          origins: [
            "https://site1.example",
            "http://site2.example",
            "https://site3.example",
          ],
        },
      },
    },
  ],
} as Partial<Options>;