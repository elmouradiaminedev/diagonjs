export function camelToUnderscore(str: string) {
  return str.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`);
}
