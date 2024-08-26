import type { PluginContext } from "rollup";

/**
 * @public
 */
export interface StrictTransportSecuritySpec {
  includeSubDomains?: boolean;
  maxAge: number;
  preload?: boolean;
}

export function buildStrictTransportSecurityValue(
  context: PluginContext,
  spec: StrictTransportSecuritySpec,
): string {
  if (spec.preload === true) {
    if (spec.maxAge < 31536000) {
      context.error(
        "The strict transport security header with preloading requires max age >= 31536000.",
      );
    }
    if (spec.includeSubDomains !== true) {
      context.error(
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
