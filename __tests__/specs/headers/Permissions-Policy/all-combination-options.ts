import type { Options } from "../../../../src";

export default {
  headers: [
    {
      action: "set",
      header: "Permissions-Policy",
      value: {
        /* eslint-disable @typescript-eslint/naming-convention -- Values fro the header specification */
        accelerometer: "*",
        "ambient-light-sensor": { src: true },
        "attribution-reporting": { src: true, self: true },
        autoplay: { self: true },
        battery: { self: true, origins: ["https://site1.example"] },
        bluetooth: { src: true },
        camera: "*",
        "compute-pressure": {
          src: true,
          origins: ["https://site1.example", "http://site2.example"],
        },
        "display-capture": {
          self: true,
          src: true,
          origins: [
            "https://site1.example",
            "http://site2.example",
            "https://site3.example",
          ],
        },
        "document-domain": { src: true },
        "encrypted-media": { src: true, self: true },
        "execution-while-not-rendered": { src: true },
        "execution-while-out-of-viewport": { self: true },
        fullscreen: { src: true },
        gamepad: { src: true },
        geolocation: { self: true },
        gyroscope: { self: true },
        hid: { self: true, origins: ["https://site1.example"] },
        "identity-credentials-get": "*",
        "idle-detection": "*",
        "local-fonts": "*",
        magnetometer: {
          self: true,
          src: true,
          origins: [
            "https://site1.example",
            "http://site2.example",
            "https://site3.example",
          ],
        },
        microphone: { src: true, self: true },
        midi: { src: true, self: true },
        "otp-credentials": { src: true },
        payment: {
          self: true,
          src: true,
          origins: [
            "https://site1.example",
            "http://site2.example",
            "https://site3.example",
          ],
        },
        "picture-in-picture": { self: true },
        "publickey-credentials-create": {},
        "publickey-credentials-get": { src: true },
        "screen-wake-lock": "*",
        serial: "*",
        "speaker-selection": {
          src: true,
          origins: ["https://site1.example", "http://site2.example"],
        },
        "storage-access": { src: true },
        usb: "*",
        "web-share": {},
        "window-management": "*",
        "xr-spatial-tracking": {},
        /* eslint-enable */
      },
    },
  ],
} as Partial<Options>;
