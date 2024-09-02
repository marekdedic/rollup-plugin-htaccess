import type { Options } from "../../../../../src";

const options: Partial<Options> = {
  spec: {
    Header: [
      {
        action: "set",
        header: "Permissions-Policy",
        value: {
          accelerometer: "*",
          "ambient-light-sensor": { src: true },
          "attribution-reporting": { self: true, src: true },
          autoplay: { self: true },
          battery: { origins: ["https://site1.example"], self: true },
          bluetooth: { src: true },
          camera: "*",
          "compute-pressure": {
            origins: ["https://site1.example", "http://site2.example"],
            src: true,
          },
          "display-capture": {
            origins: [
              "https://site1.example",
              "http://site2.example",
              "https://site3.example",
            ],
            self: true,
            src: true,
          },
          "document-domain": { src: true },
          "encrypted-media": { self: true, src: true },
          "execution-while-not-rendered": { src: true },
          "execution-while-out-of-viewport": { self: true },
          fullscreen: { src: true },
          gamepad: { src: true },
          geolocation: { self: true },
          gyroscope: { self: true },
          hid: { origins: ["https://site1.example"], self: true },
          "identity-credentials-get": "*",
          "idle-detection": "*",
          "local-fonts": "*",
          magnetometer: {
            origins: [
              "https://site1.example",
              "http://site2.example",
              "https://site3.example",
            ],
            self: true,
            src: true,
          },
          microphone: { self: true, src: true },
          midi: { self: true, src: true },
          "otp-credentials": { src: true },
          payment: {
            origins: [
              "https://site1.example",
              "http://site2.example",
              "https://site3.example",
            ],
            self: true,
            src: true,
          },
          "picture-in-picture": { self: true },
          "publickey-credentials-create": {},
          "publickey-credentials-get": { src: true },
          "screen-wake-lock": "*",
          serial: "*",
          "speaker-selection": {
            origins: ["https://site1.example", "http://site2.example"],
            src: true,
          },
          "storage-access": { src: true },
          usb: "*",
          "web-share": {},
          "window-management": "*",
          "xr-spatial-tracking": {},
        },
      },
    ],
  },
};

export default options;
