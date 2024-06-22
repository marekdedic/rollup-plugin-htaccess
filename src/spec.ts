import { buildHeader, type HeaderSpecUnion } from "./directives/Header";
import { buildOptions, type OptionsSpec } from "./directives/Options";

export interface Spec {
  Header?: Array<HeaderSpecUnion>;
  Options?: OptionsSpec;
}

export function buildSpec(spec: Spec): string {
  let output = "";
  if (spec.Options !== undefined) {
    output += buildOptions(spec.Options) + "\n";
  }
  for (const header of spec.Header ?? []) {
    output += buildHeader(header) + "\n";
  }
  return output;
}
