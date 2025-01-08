import type { PluginContext } from "rollup";

import type { Spec } from "../spec";

import { buildInnerSpec } from "../utils";

/**
 * @public
 */
export interface IfDefineSpec {
  innerSpec: Spec;
  inverted?: boolean;
  parameterName: string;
}

export function buildIfDefine(
  context: PluginContext,
  spec: IfDefineSpec,
): string {
  return `<IfDefine ${spec.inverted === true ? "!" : ""}${spec.parameterName}>\n${buildInnerSpec(context, spec.innerSpec)}\n</IfDefine>`;
}
