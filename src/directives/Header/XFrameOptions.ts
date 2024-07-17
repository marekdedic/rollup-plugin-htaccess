/**
 * @public
 * @deprecated The Content-Security-Policy HTTP header has a frame-ancestors directive which obsoletes this header for supporting browsers.
 */
export type XFrameOptionsSpec = "deny" | "sameorigin";

export function buildXFrameOptionsValue(spec: XFrameOptionsSpec): string {
  return spec === "sameorigin" ? "SAMEORIGIN" : "DENY";
}
