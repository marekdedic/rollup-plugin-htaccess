/**
 * @public
 */
export type ReferrerPolicySpec =
  | "no-referrer-when-downgrade"
  | "no-referrer"
  | "origin-when-cross-origin"
  | "origin"
  | "same-origin"
  | "strict-origin-when-cross-origin"
  | "strict-origin"
  | "unsafe-url";

export function buildReferrerPolicyValue(spec: ReferrerPolicySpec): string {
  return spec;
}
