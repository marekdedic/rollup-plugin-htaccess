import type { Options } from "../../../src";

const options: Partial<Options> = {
  spec: {
    AddOutputFilterByType: [
      {
        filters: ["DEFLATE"],
        mediaTypes: ["application/javascript"],
      },
    ],
    Files: [
      {
        fileName: "index.html",
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
