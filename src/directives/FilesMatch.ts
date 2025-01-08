import type { PluginContext } from "rollup";

import type { Spec } from "../spec";

import { buildInnerSpec, escapeValue } from "../utils";

/**
 * @public
 */
export interface FilesMatchSpec {
  innerSpec: Spec;
  regex: string;
}

export function buildFilesMatch(
  context: PluginContext,
  spec: FilesMatchSpec,
): string {
  return `<FilesMatch "${escapeValue(spec.regex)}">\n${buildInnerSpec(context, spec.innerSpec)}\n</FilesMatch>`;
}
