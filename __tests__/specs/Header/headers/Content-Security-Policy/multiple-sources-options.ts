import type { Options } from "../../../../../src";

const options: Partial<Options> = {
  spec: {
    Header: [
      {
        action: "set",
        header: "Content-Security-Policy",
        value: {
          "base-uri": { hosts: ["https://site.example"] },
          "connect-src": { schemes: { data: true } },
          "default-src": { schemes: { mediastream: true } },
          "fenced-frame-src": { schemes: { blob: true } },
          "font-src": { schemes: { filesystem: true } },
          "form-action": { self: true },
          "frame-ancestors": { "unsafe-eval": true },
          "frame-src": { "wasm-unsafe-eval": true },
          "img-src": { "unsafe-hashes": true },
          "manifest-src": { "unsafe-inline": true },
          "media-src": { nonces: ["abc"] },
          "object-src": { hashes: { sha256: ["def"] } },
          "script-src": { "strict-dynamic": true },
          "script-src-attr": { hashes: { sha384: ["ghi"] } },
          "script-src-elem": { hashes: { sha512: ["jkl"] } },
          "style-src": {},
          "style-src-attr": { "report-sample": true },
          "style-src-elem": { "inline-speculation-rules": true },
          "worker-src": { self: true },
        },
      },
    ],
  },
};

export default options;
