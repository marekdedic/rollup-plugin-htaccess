import type { Options } from "../../../src";

const options: Partial<Options> = {
  spec: {
    AddOutputFilterByType: [
      {
        filters: ["DEFLATE"],
        mediaTypes: ["application/javascript"],
      },
    ],
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
          AddOutputFilterByType: [
            {
              filters: ["INCLUDES", "DEFLATE"],
              mediaTypes: ["text/html", "text/plain", "application/javascript"],
            },
          ],
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
    ],
  },
};

export default options;
