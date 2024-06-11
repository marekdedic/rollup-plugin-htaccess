export interface StrictTransportSecuritySpec {
  maxAge: number;
  includeSubDomains?: boolean;
  preload?: boolean;
}

export function buildStrictTransportSecurityValue(
  spec: StrictTransportSecuritySpec,
): string {
  if (spec.preload === true) {
    if (spec.maxAge < 31536000) {
      throw new Error(
        "The strict transport security header with preloading requires max age >= 31536000.",
      );
    }
    if (spec.includeSubDomains !== true) {
      throw new Error(
        "The strict transport security header with preloading requires subdomains to be included.",
      );
    }
  }
  return (
    "max-age=" +
    spec.maxAge.toString() +
    (spec.includeSubDomains === true ? "; includeSubDomains" : "") +
    (spec.preload === true ? "; preload" : "")
  );
}
