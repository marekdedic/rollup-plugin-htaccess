import type { PluginContext } from "rollup";

import type { Spec } from "../spec";

import { buildInnerSpec, escapeValue } from "../utils";

/**
 * @public
 */
export interface IfSpec {
  condition: string;
  Else?: {
    innerSpec: Spec;
  };
  ElseIf?: Array<{
    condition: string;
    innerSpec: Spec;
  }>;
  innerSpec: Spec;
}

export function buildIf(context: PluginContext, spec: IfSpec): string {
  let output = `<If "${escapeValue(spec.condition)}">\n${buildInnerSpec(context, spec.innerSpec)}\n</If>`;
  for (const elseIfSpec of spec.ElseIf ?? []) {
    output += `\n<ElseIf "${escapeValue(elseIfSpec.condition)}">\n${buildInnerSpec(context, elseIfSpec.innerSpec)}\n</ElseIf>`;
  }
  if (spec.Else !== undefined) {
    output += `\n<Else>\n${buildInnerSpec(context, spec.Else.innerSpec)}\n</Else>`;
  }
  return output;
}
