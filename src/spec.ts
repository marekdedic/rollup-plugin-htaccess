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
import { buildFilesMatch, type FilesMatchSpec } from "./directives/FilesMatch";
import { buildHeader, type HeaderSpecUnion } from "./directives/Header";
import { buildIf, type IfSpec } from "./directives/If";
import { buildIfDefine, type IfDefineSpec } from "./directives/IfDefine";
import {
  buildIfDirective,
  type IfDirectiveSpec,
} from "./directives/IfDirective";
import { buildIfFile, type IfFileSpec } from "./directives/IfFile";
import { buildIfModule, type IfModuleSpec } from "./directives/IfModule";
import { buildIfSection, type IfSectionSpec } from "./directives/IfSection";
import { buildOptions, type OptionsSpec } from "./directives/Options";
import { buildRewrite, type RewriteSpec } from "./rewrite";

/**
 * @public
 */
export interface Spec {
  AddOutputFilterByType?: AddOutputFilterByTypeSpec;
  ErrorDocument?: ErrorDocumentSpec;
  Files?: Array<FilesSpec>;
  FilesMatch?: Array<FilesMatchSpec>;
  Header?: Array<HeaderSpecUnion>;
  If?: Array<IfSpec>;
  IfDefine?: Array<IfDefineSpec>;
  IfDirective?: Array<IfDirectiveSpec>;
  IfFile?: Array<IfFileSpec>;
  IfModule?: Array<IfModuleSpec>;
  IfSection?: Array<IfSectionSpec>;
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
  for (const filesMatch of spec.FilesMatch ?? []) {
    output += `${buildFilesMatch(context, filesMatch)}\n`;
  }
  for (const ifSpec of spec.If ?? []) {
    output += `${buildIf(context, ifSpec)}\n`;
  }
  for (const ifDefineSpec of spec.IfDefine ?? []) {
    output += `${buildIfDefine(context, ifDefineSpec)}\n`;
  }
  for (const ifDirectiveSpec of spec.IfDirective ?? []) {
    output += `${buildIfDirective(context, ifDirectiveSpec)}\n`;
  }
  for (const ifFileSpec of spec.IfFile ?? []) {
    output += `${buildIfFile(context, ifFileSpec)}\n`;
  }
  for (const ifModuleSpec of spec.IfModule ?? []) {
    output += `${buildIfModule(context, ifModuleSpec)}\n`;
  }
  for (const ifSectionSpec of spec.IfSection ?? []) {
    output += `${buildIfSection(context, ifSectionSpec)}\n`;
  }
  return output;
}
