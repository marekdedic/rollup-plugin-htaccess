import type { Options } from "../../../src";

const options: Partial<Options> = {
  spec: {
    Header: [
      {
        action: "set",
        always: true,
        header: "Permissions-Policy",
        value: {
          camera: {},
          "display-capture": {},
          fullscreen: {},
          geolocation: {},
          microphone: {},
          "web-share": {},
        },
      },
    ],
    If: [
      {
        condition: "%{QUERY_STRING} =~ /(delete|commit)=.*?elem/",
        Else: {
          innerSpec: {
            Header: [
              {
                action: "set",
                always: true,
                header: "Permissions-Policy",
                value: {
                  camera: {},
                  "display-capture": {},
                  fullscreen: { self: true },
                  geolocation: {},
                  microphone: { self: true },
                  "web-share": {},
                },
              },
            ],
          },
        },
        innerSpec: {
          Header: [
            {
              action: "set",
              always: true,
              header: "Permissions-Policy",
              value: {
                camera: {},
                "display-capture": {},
                fullscreen: { self: true },
                geolocation: {},
                microphone: {},
                "web-share": {},
              },
            },
          ],
        },
      },
    ],
  },
};

export default options;
