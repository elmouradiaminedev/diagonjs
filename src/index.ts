import {
  math,
  MathTranslationOptions,
  MathTranslationStyle,
} from "./translators/math";
import { sequence, SequenceTranslationOptions } from "./translators/sequence";
import { TranslationTool } from "./lib/internal";
import {
  tree,
  TreeTranslationOptions,
  TreeTranslationStyle,
} from "./translators/tree";

export type {
  MathTranslationOptions,
  MathTranslationStyle,
  SequenceTranslationOptions,
  TreeTranslationOptions,
  TreeTranslationStyle,
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
  /**
   * Translation function for Tree expressions.
   *
   * @param expression - The tree expression to be translated.
   * @param options - Options for tree translation.
   * @returns The translated tree expression.
   * @example
   * const translatedTreeExpression = tree("expression", { style: "Unicode 2" });
   * console.log(translatedTreeExpression)
   * //  Linux
   * //   ├──Android
   * //   ├──Debian
   * //   │   ├──Ubuntu
   * //   │   │   ├──Lubuntu
   * //   │   │   ├──Kubuntu
   * //   │   │   ├──Xubuntu
   * //   │   │   └──Xubuntu
   * //   │   └──Mint
   * //   ├──Centos
   * //   └──Fedora
   */
  tree: (expression: string, options?: TreeTranslationOptions) => string;
};

export const translate: Translator = {
  math,
  sequence,
  tree,
};
