import type { PluginContext } from "rollup";

import type { Spec } from "../spec";

import { buildInnerSpec } from "../utils";

/**
 * @public
 */
export interface IfDirectiveSpec {
  directiveName: string;
  innerSpec: Spec;
  inverted?: boolean;
}

export function buildIfDirective(
  context: PluginContext,
  spec: IfDirectiveSpec,
): string {
  return `<IfDirective ${spec.inverted === true ? "!" : ""}${spec.directiveName}>\n${buildInnerSpec(context, spec.innerSpec)}\n</IfDirective>`;
}
