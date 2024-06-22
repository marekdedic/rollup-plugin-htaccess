import { buildHeader, type HeaderSpecUnion } from "./headers";

export interface Spec {
  headers?: Array<HeaderSpecUnion>;
}

export function buildSpec(spec: Spec): string {
  let output = "";
  for (const header of spec.headers ?? []) {
    output += buildHeader(header) + "\n";
  }
  return output;
}
