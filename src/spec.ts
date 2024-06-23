import {
  buildErrorDocument,
  type ErrorDocumentSpec,
} from "./directives/ErrorDocument";
import { buildHeader, type HeaderSpecUnion } from "./directives/Header";
import { buildOptions, type OptionsSpec } from "./directives/Options";

export interface Spec {
  ErrorDocument?: ErrorDocumentSpec;
  Header?: Array<HeaderSpecUnion>;
  Options?: OptionsSpec;
}

export function buildSpec(spec: Spec): string {
  let output = "";
  if (spec.ErrorDocument !== undefined) {
    output += buildErrorDocument(spec.ErrorDocument) + "\n";
  }
  if (spec.Options !== undefined) {
    output += buildOptions(spec.Options) + "\n";
  }
  for (const header of spec.Header ?? []) {
    output += buildHeader(header) + "\n";
  }
  return output;
}
