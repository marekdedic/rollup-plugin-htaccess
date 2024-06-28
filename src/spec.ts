import {
  type AddOutputFilterByTypeSpec,
  buildAddOutputFilterByType,
} from "./directives/AddOutputFilterByType";
import {
  buildErrorDocument,
  type ErrorDocumentSpec,
} from "./directives/ErrorDocument";
import { buildHeader, type HeaderSpecUnion } from "./directives/Header";
import { buildOptions, type OptionsSpec } from "./directives/Options";
import { buildRewrite, type RewriteSpec } from "./mod_rewrite";

export interface Spec {
  AddOutputFilterByType?: AddOutputFilterByTypeSpec;
  ErrorDocument?: ErrorDocumentSpec;
  Header?: Array<HeaderSpecUnion>;
  Options?: OptionsSpec;
  rewrite?: RewriteSpec;
}

export function buildSpec(spec: Spec): string {
  let output = "";
  if (spec.AddOutputFilterByType !== undefined) {
    output += buildAddOutputFilterByType(spec.AddOutputFilterByType) + "\n";
  }
  if (spec.ErrorDocument !== undefined) {
    output += buildErrorDocument(spec.ErrorDocument) + "\n";
  }
  if (spec.Options !== undefined) {
    output += buildOptions(spec.Options) + "\n";
  }
  for (const header of spec.Header ?? []) {
    output += buildHeader(header) + "\n";
  }
  if (spec.rewrite !== undefined) {
    output += buildRewrite(spec.rewrite) + "\n";
  }
  return output;
}
