/**
 * @public
 */
export type AddOutputFilterByTypeSpec = Array<{
  filters: Array<string>;
  mediaTypes: Array<string>;
}>;

export function buildAddOutputFilterByType(
  spec: AddOutputFilterByTypeSpec,
): string {
  const output: Array<string> = [];
  for (const directive of spec) {
    output.push(
      "AddOutputFilterByType " +
        directive.filters.join(";") +
        " " +
        directive.mediaTypes.join(" "),
    );
  }
  return output.join("\n");
}
