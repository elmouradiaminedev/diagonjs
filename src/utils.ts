/**
 * Converts a camelCase string to underscore_case.
 *
 * @param {string} str - The camelCase string to convert.
 * @returns {string} The string converted to underscore_case.
 */
export const camelToUnderscore = (str: string): string => {
  return str.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`);
};
