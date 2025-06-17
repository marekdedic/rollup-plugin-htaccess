import type { PluginContext } from "rollup";

import type { Spec } from "../spec";

import { buildInnerSpec, escapeValue } from "../utils";

/**
 * @public
 */
export interface FilesSpec {
  fileName: string;
  innerSpec: Spec;
}

export function buildFiles(context: PluginContext, spec: FilesSpec): string {
  if (spec.fileName.includes("/")) {
    context.error(
      "The <Files> directive cannot contain files in subfolders. Use a separate .htaccess file or the <If> directive.",
    );
  }
  return `<Files "${escapeValue(spec.fileName)}">\n${buildInnerSpec(context, spec.innerSpec)}\n</Files>`;
}
