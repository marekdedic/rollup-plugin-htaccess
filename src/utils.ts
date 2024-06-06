export function escapeValue(value: string): string {
  return value.replace(/"/g, '\\"');
}
