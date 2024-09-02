/**
 * @public
 */
export type ErrorDocumentSpec = Record<number, string>;

export function buildErrorDocument(spec: ErrorDocumentSpec): string {
  const output: Array<string> = [];
  for (const errorCode in spec) {
    if (!Object.prototype.hasOwnProperty.call(spec, errorCode)) {
      continue;
    }
    let doc = spec[errorCode];
    if (doc.includes(" ")) {
      doc = `"${doc}"`;
    }
    output.push(`ErrorDocument ${errorCode} ${doc}`);
  }
  return output.join("\n");
}
