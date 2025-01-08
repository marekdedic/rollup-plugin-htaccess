import type { Options } from "../../../src";

const options: Partial<Options> = {
  spec: {
    AddOutputFilterByType: [
      {
        filters: ["DEFLATE"],
        mediaTypes: ["application/javascript"],
      },
    ],
    FilesMatch: [
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
        regex: ".+\\.(gif|jpe?g|png)$",
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
  },
};

export default options;
