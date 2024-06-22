type Option =
  | "All"
  | "ExecCGI"
  | "FollowSymLinks"
  | "Includes"
  | "IncludesNOEXEC"
  | "Indexes"
  | "MultiViews"
  | "SymLinksIfOwnerMatch";

export type OptionsSpec =
  | "None"
  | {
      plus?: Array<Option>;
      minus?: Array<Option>;
    }
  | {
      set: Array<Option>;
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
    output.push(spec.plus.map((option) => "+" + option).join(" "));
  }
  if ("minus" in spec && spec.minus !== undefined) {
    output.push(spec.minus.map((option) => "-" + option).join(" "));
  }
  return output.join(" ");
}
