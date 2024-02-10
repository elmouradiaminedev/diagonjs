import DiagonCore from "@vendors/diagon";
import { camelToUnderscore } from "./utils";

/**
 * Represents the available translation operations.
 */
export type TranslateOperation = "Math";

/**
 * Represents the base styles for translation.
 */
export type BaseTranslateStyle = "Unicode" | "ASCII" | "Latex";

/**
 * Represents the options for mathematical translation.
 */
export type TranslateMathOptions = {
  style?: BaseTranslateStyle;
  transformMathLetters?: boolean;
};

/**
 * Represents options for translation with dynamic keys and various value types.
 */
export type TranslateOptions = { [key: string]: string | number | boolean };

/**
 * Represents the internal translation function type.
 */
type _TranslateFunction = (
  operation: TranslateOperation,
  expression: string,
  options: string,
) => string;

/**
 * The core translation function that wraps the cpp function
 * @private
 */
const _translate: _TranslateFunction = DiagonCore.cwrap("translate", "string", [
  "string",
  "string",
  "string",
]);

/**
 * Converts translation options to a string.
 * @param options - The options to stringify.
 * @returns The string representation of the options.
 * @private
 */
const _stringifyOptions = (options: TranslateOptions): string => {
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

export const translate = {
  /**
   * Translates a mathematical expression.
   * @param expression - The mathematical expression to translate.
   * @param options - The translation options.
   * @returns The translated string.
   */
  math: (expression: string, options: TranslateMathOptions = {}): string => {
    return _translate("Math", expression, _stringifyOptions(options));
  },
};

export default {
  translate,
};
