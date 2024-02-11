import DiagonCore from "@vendors/diagon";
import { camelToUnderscore } from "./utils";

/**
 * Represents the translation tool type.
 */
export type TranslationTool = "Math" | "Sequence";

/**
 * Represents the style of mathematical translation.
 */
export type MathTranslationStyle = "Unicode" | "ASCII" | "Latex";

/**
 * Options for mathematical translation.
 */
export type MathTranslationOptions = {
  style?: MathTranslationStyle;
  transformMathLetters?: boolean;
};

/**
 * Options for sequence translation.
 */
export type SequenceTranslationOptions = {
  asciiOnly?: boolean;
  interpretBackSlashN?: boolean;
};

/**
 * Options for translation, allowing string, number, or boolean values.
 */
export type TranslationOptions = { [key: string]: string | number | boolean };

/**
 * Represents the type of translation function.
 *
 * @param operation - The type of translation operation, either "Math" or "Sequence".
 * @param expression - The expression to be translated.
 * @param options - Options for translation in string format.
 * @returns The translated expression.
 */
type _TranslationFunction = (
  tool: TranslationTool,
  expression: string,
  options: string,
) => string;

/**
 * Calls the C function "translate" from DiagonCore.
 */
const _translate: _TranslationFunction = DiagonCore.cwrap(
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
const _stringifyOptions = (options: TranslationOptions): string => {
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
 * Close that creates a translation function based on the specified tool type .
 *
 * @param tool - The type of translation tool.
 * @returns A translation function for the specified tool.
 */
const _createTranslationFunction =
  <T extends TranslationOptions>(tool: TranslationTool) =>
  /**
   * Translates the given expression with optional translation options.
   *
   * @param expression - The expression to be translated.
   * @param options - Options for translation.
   * @returns The translated expression.
   */
  (expression: string, options?: T): string => {
    return _translate(tool, expression, _stringifyOptions(options || {}));
  };

/**
 * Object containing translation functions for different translation tools
 */
export const translate = {
  /**
   * Translation function for mathematical expressions.
   *
   * @param expression - The expression to be translated.
   * @param options - Options for translation.
   * @returns The translated expression.
   * @example
   * const translatedMathExpression = translate.math("f(x) = 1 + x / (1 + x)", { style: "Unicode" });
   * console.log(translatedMathExpression)
   * //               x  
   * // f(x) = 1 + ─────
   * //            1 + x
   */
  math: _createTranslationFunction<MathTranslationOptions>("Math"),

  /**
   * Translation function for sequence expressions.
   *
   * @param expression - The expression to be translated.
   * @param options - Options for translation.
   * @returns The translated expression.
   * @example
   * const translatedSequenceExpression = translate.sequence("Alice -> Bob: Hello Bob!\nAlice <- Bob: Hello Alice!", { "asciiOnly":false })
   * console.log(translatedSequenceExpression)
   * // ┌─────┐       ┌───┐
   * // │Alice│       │Bob│
   * // └──┬──┘       └─┬─┘
   * //    │            │  
   * //    │ Hello Bob! │  
   * //    │───────────>│  
   * //    │            │  
   * //    │Hello Alice!│  
   * //    │<───────────│  
   * // ┌──┴──┐       ┌─┴─┐
   * // │Alice│       │Bob│
   * // └─────┘       └───┘            
   */

  sequence: _createTranslationFunction<SequenceTranslationOptions>("Sequence"),
};

export default {
  translate,
};
