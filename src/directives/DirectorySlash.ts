/**
 * @public
 */
export interface DirectorySlashSpec {
  value: boolean;
}

export function buildDirectorySlash(spec: DirectorySlashSpec): string {
  return `DirectorySlash ${spec.value ? "On" : "Off"}\n`;
}
