export type XFrameOptionsSpec = "deny" | "sameorigin";

export function buildXFrameOptionsValue(spec: XFrameOptionsSpec): string {
  return spec === "sameorigin" ? "SAMEORIGIN" : "DENY";
}
