/**
 * @public
 */
export type OptionName =
  | "All"
  | "ExecCGI"
  | "FollowSymLinks"
  | "Includes"
  | "IncludesNOEXEC"
  | "Indexes"
  | "MultiViews"
  | "SymLinksIfOwnerMatch";

/**
 * @public
 */
export type OptionsSpec =
  | "None"
  | {
      minus?: Array<OptionName> | undefined;
      plus?: Array<OptionName> | undefined;
    }
  | {
      set: Array<OptionName>;
    };

export function buildOptions(spec: OptionsSpec): string {
  if (spec === "None") {
    return "Options None";
  }
  const output = ["Options"];
  if ("set" in spec) {
    output.push(spec.set.join(" "));
  }
  if ("plus" in spec && spec.plus !== undefined) {
    output.push(spec.plus.map((option) => `+${option}`).join(" "));
  }
  if ("minus" in spec && spec.minus !== undefined) {
    output.push(spec.minus.map((option) => `-${option}`).join(" "));
  }
  return output.join(" ");
}
