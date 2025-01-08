import type { PluginContext } from "rollup";

import type { Spec } from "../spec";

import { buildInnerSpec } from "../utils";

/**
 * @public
 */
export interface IfFileSpec {
  fileName: string;
  innerSpec: Spec;
  inverted?: boolean;
}

export function buildIfFile(context: PluginContext, spec: IfFileSpec): string {
  return `<IfFile ${spec.inverted === true ? "!" : ""}${spec.fileName}>\n${buildInnerSpec(context, spec.innerSpec)}\n</IfFile>`;
}
