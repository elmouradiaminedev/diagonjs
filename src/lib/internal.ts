import DiagonCore from "@vendors/diagon";
import { camelToUnderscore } from "../utils";

/**
 * Represents the translation tool.
 */
export type TranslationTool = "Math" | "Sequence" | "Tree" | "Table";

/**
 * Represents the type of translation function.
 */
type TranslationFunction = (
  tool: TranslationTool,
  expression: string,
  options: string,
) => string;

/**
 * Options for translation, allowing string, number, or boolean values.
 */
type TranslationOptions = { [key: string]: string | number | boolean };

/**
 * Calls the C function "translate" from DiagonCore.
 */
const _translate: TranslationFunction = DiagonCore.cwrap(
  "translate",
  "string",
  ["string", "string", "string"],
);

/**
 * Converts options object to a string representation.
 *
 * @param options - Options for translation.
 * @returns A string representation of translation options.
 */
const stringifyOptions = (options: TranslationOptions): string => {
  let result = "";
  for (const key in options) {
    if (Object.prototype.hasOwnProperty.call(options, key)) {
      const underscoreKey = camelToUnderscore(key);
      const value = options[key];
      result += `${underscoreKey}\n${value}\n`;
    }
  }
  return result;
};

/**
 * Closure that creates a translation function based on the specified translation tool.
 *
 * @param tool - The type of translation tool.
 * @returns A translation function for the specified tool.
 */
export const createTranslationFunction =
  <T extends TranslationOptions>(tool: TranslationTool) =>
  (expression: string, options?: T): string => {
    return _translate(tool, expression, stringifyOptions(options || {}));
  };
