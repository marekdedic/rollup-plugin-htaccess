import { buildHeader, type HeaderSpecUnion } from "./directives/Header";

export interface Spec {
  Header?: Array<HeaderSpecUnion>;
}

export function buildSpec(spec: Spec): string {
  let output = "";
  for (const header of spec.Header ?? []) {
    output += buildHeader(header) + "\n";
  }
  return output;
}
