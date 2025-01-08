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
    IfDefine: [
      {
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
        parameterName: "UseCache",
      },
      {
        innerSpec: {
          Header: [
            {
              action: "set",
              always: true,
              header: "Permissions-Policy",
              value: {
                camera: { self: true },
                "display-capture": {},
                fullscreen: {},
                geolocation: {},
                microphone: {},
                "web-share": {},
              },
            },
          ],
        },
        inverted: true,
        parameterName: "UseCache",
      },
    ],
  },
};

export default options;
