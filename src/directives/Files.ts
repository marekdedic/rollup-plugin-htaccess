import type { PluginContext } from "rollup";

import { buildSpec, type Spec } from "../spec";
import { escapeValue } from "../utils";

/**
 * @public
 */
export interface FilesSpec {
  fileName: string;
  innerSpec: Spec;
}

export function buildFiles(context: PluginContext, spec: FilesSpec): string {
  return `<Files "${escapeValue(spec.fileName)}">\n${buildSpec(context, spec.innerSpec).trim().replace(/^/gmu, "\t")}\n</Files>`;
}
