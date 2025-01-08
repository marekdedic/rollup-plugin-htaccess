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
  return `<Files "${escapeValue(spec.fileName)}">\n${buildInnerSpec(context, spec.innerSpec)}\n</Files>`;
}
