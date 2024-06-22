import type { Options } from "../../../../../src";

export default {
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
          "script-src-attr": { hashes: { sha384: ["ghi"] } },
          "script-src-elem": { hashes: { sha512: ["jkl"] } },
          "script-src": { "strict-dynamic": true },
          "style-src-attr": { "report-sample": true },
          "style-src-elem": { "inline-speculation-rules": true },
          "style-src": {},
          "worker-src": { self: true },
        },
      },
    ],
  },
} as Partial<Options>;
