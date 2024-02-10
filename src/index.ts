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
 * Represents the translation function type.
 */
type _TranslateFunction = (
  operation: TranslateOperation,
  statement: string,
  options: string,
) => string;

/**
 * The Diagon Module for translation operations.
 */
const Diagon = (() => {
  /**
   * The core cpp diagon translate function wrapper
   * @private
   */
  const _translate: _TranslateFunction = DiagonCore.cwrap(
    "translate",
    "string",
    ["string", "string", "string"],
  );

  /**
   * Converts options to a string for translation.
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

  const translate = {
    /**
     * Translates a mathematical statement.
     * @param statement - The mathematical statement to translate.
     * @param options - The translation options.
     * @returns The translated string.
     */
    math: (statement: string, options: TranslateMathOptions = {}) => {
      return _translate("Math", statement, _stringifyOptions(options));
    },
  };

  return {
    translate,
  };
})();

export default Diagon;
