import type { PluginContext } from "rollup";

import {
  type AddOutputFilterByTypeSpec,
  buildAddOutputFilterByType,
} from "./directives/AddOutputFilterByType";
import {
  buildErrorDocument,
  type ErrorDocumentSpec,
} from "./directives/ErrorDocument";
import { buildFiles, type FilesSpec } from "./directives/Files";
import { buildHeader, type HeaderSpecUnion } from "./directives/Header";
import { buildOptions, type OptionsSpec } from "./directives/Options";
import { buildRewrite, type RewriteSpec } from "./rewrite";

/**
 * @public
 */
export interface Spec {
  AddOutputFilterByType?: AddOutputFilterByTypeSpec;
  ErrorDocument?: ErrorDocumentSpec;
  Files?: Array<FilesSpec>;
  Header?: Array<HeaderSpecUnion>;
  Options?: OptionsSpec;
  rewrite?: RewriteSpec;
}

export function buildSpec(context: PluginContext, spec: Spec): string {
  let output = "";
  if (spec.AddOutputFilterByType !== undefined) {
    output += `${buildAddOutputFilterByType(spec.AddOutputFilterByType)}\n`;
  }
  if (spec.ErrorDocument !== undefined) {
    output += `${buildErrorDocument(spec.ErrorDocument)}\n`;
  }
  if (spec.Options !== undefined) {
    output += `${buildOptions(spec.Options)}\n`;
  }
  for (const header of spec.Header ?? []) {
    output += `${buildHeader(context, header)}\n`;
  }
  if (spec.rewrite !== undefined) {
    output += `${buildRewrite(spec.rewrite)}\n`;
  }
  for (const files of spec.Files ?? []) {
    output += `${buildFiles(context, files)}\n`;
  }
  return output;
}
