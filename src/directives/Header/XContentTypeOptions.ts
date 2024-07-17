/**
 * @public
 */
export interface XContentTypeOptionsSpec {
  nosniff: true;
}

export function buildXContentTypeOptionsValue(): string {
  return "nosniff";
}
