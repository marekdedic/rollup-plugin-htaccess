import type { PluginContext } from "rollup";

import type { Spec } from "../spec";

import { buildInnerSpec } from "../utils";

/**
 * @public
 */
export interface IfSectionSpec {
  innerSpec: Spec;
  inverted?: boolean;
  sectionName: string;
}

export function buildIfSection(
  context: PluginContext,
  spec: IfSectionSpec,
): string {
  return `<IfSection ${spec.inverted === true ? "!" : ""}${spec.sectionName}>\n${buildInnerSpec(context, spec.innerSpec)}\n</IfSection>`;
}
