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
                  camera: { self: true },
                  "display-capture": {},
                  fullscreen: { self: true },
                  geolocation: { self: true },
                  microphone: {},
                  "web-share": {},
                },
              },
            ],
          },
        },
        ElseIf: [
          {
            condition: "%{QUERY_STRING} =~ /(change)=.*?elem/",
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
                    geolocation: { self: true },
                    microphone: {},
                    "web-share": {},
                  },
                },
              ],
            },
          },
          {
            condition: "%{QUERY_STRING} =~ /(create)=.*?elem/",
            innerSpec: {
              Header: [
                {
                  action: "set",
                  always: true,
                  header: "Permissions-Policy",
                  value: {
                    camera: { self: true },
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
