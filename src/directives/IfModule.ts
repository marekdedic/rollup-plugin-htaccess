import type { PluginContext } from "rollup";

import type { Spec } from "../spec";

import { buildInnerSpec } from "../utils";

/**
 * @public
 */
export interface IfModuleSpec {
  innerSpec: Spec;
  inverted?: boolean;
  moduleNameOrIdentifier: string;
}

export function buildIfModule(
  context: PluginContext,
  spec: IfModuleSpec,
): string {
  return `<IfModule ${spec.inverted === true ? "!" : ""}${spec.moduleNameOrIdentifier}>\n${buildInnerSpec(context, spec.innerSpec)}\n</IfModule>`;
}
