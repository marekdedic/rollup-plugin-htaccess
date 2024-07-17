import { escapeValue } from "../../utils";

/**
 * @public
 */
export type PermissionsPolicyDirectives =
  | "accelerometer"
  | "ambient-light-sensor"
  | "attribution-reporting"
  | "autoplay"
  | "battery"
  | "bluetooth"
  | "camera"
  | "compute-pressure"
  | "display-capture"
  | "document-domain"
  | "encrypted-media"
  | "execution-while-not-rendered"
  | "execution-while-out-of-viewport"
  | "fullscreen"
  | "gamepad"
  | "geolocation"
  | "gyroscope"
  | "hid"
  | "identity-credentials-get"
  | "idle-detection"
  | "local-fonts"
  | "magnetometer"
  | "microphone"
  | "midi"
  | "otp-credentials"
  | "payment"
  | "picture-in-picture"
  | "publickey-credentials-create"
  | "publickey-credentials-get"
  | "screen-wake-lock"
  | "serial"
  | "speaker-selection"
  | "storage-access"
  | "usb"
  | "web-share"
  | "window-management"
  | "xr-spatial-tracking";

/**
 * @public
 */
export type PermissionsPolicyAllowlist =
  | "*"
  | { src?: boolean; self?: boolean; origins?: Array<string> };

/**
 * @public
 */
export type PermissionsPolicySpec = Partial<
  Record<PermissionsPolicyDirectives, PermissionsPolicyAllowlist>
>;

function buildAllowlist(allowlist: PermissionsPolicyAllowlist): string {
  if (allowlist === "*") {
    return "*";
  }
  const list =
    allowlist.origins?.map((origin) => '\\"' + escapeValue(origin) + '\\"') ??
    [];
  if (allowlist.src === true) {
    list.unshift("src");
  }
  if (allowlist.self === true) {
    list.unshift("self");
  }
  return "(" + list.join(" ") + ")";
}

export function buildPermissionsPolicyValue(
  spec: PermissionsPolicySpec,
): string {
  const parts = [];
  for (const key in spec) {
    parts.push(
      key + "=" + buildAllowlist(spec[key as PermissionsPolicyDirectives]!),
    );
  }
  return parts.join(", ");
}
