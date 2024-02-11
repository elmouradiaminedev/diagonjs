import {
  math,
  MathTranslationOptions,
  MathTranslationStyle,
} from "./translators/math";
import { sequence, SequenceTranslationOptions } from "./translators/sequence";
import { TranslationTool } from "./lib/internal";

export type {
  MathTranslationOptions,
  MathTranslationStyle,
  SequenceTranslationOptions,
  TranslationTool,
};

type Translator = {
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
  math: (expression: string, options?: MathTranslationOptions) => string;
  /**
   * Translation function for sequence expressions.
   *
   * @param expression - The expression to be translated.
   * @param options - Options for translation.
   * @returns The translated expression.
   * @example
   * const translatedSequenceExpression = translate.sequence("Alice -> Bob: Hello Bob!\nAlice <- Bob: Hello Alice!", { "asciiOnly": false })
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
  sequence: (
    expression: string,
    options?: SequenceTranslationOptions,
  ) => string;
};

export const translate: Translator = {
  math,
  sequence,
};
