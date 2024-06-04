export interface StrictTransportSecuritySpec {
  maxAge: number;
  includeSubDomains?: boolean;
  preload?: boolean;
}

export function buildStrictTransportSecurityValue(
  spec: StrictTransportSecuritySpec,
): string {
  return (
    "max-age=" +
    spec.maxAge.toString() +
    (spec.includeSubDomains === true ? "; includeSubDomains" : "") +
    (spec.preload === true ? "; preload" : "")
  );
}
