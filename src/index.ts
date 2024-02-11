import {
  math,
  MathTranslationOptions,
  MathTranslationStyle,
  MATH_TRANSLATION_STYLES,
} from "./translators/math";
import { sequence, SequenceTranslationOptions } from "./translators/sequence";
import {
  tree,
  TreeTranslationOptions,
  TreeTranslationStyle,
  TREE_TRANSLATION_STYLES,
} from "./translators/tree";
import {
  TableTranslationOptions,
  TableTranslationStyle,
  TABLE_TRANSLATION_STYLES,
  table,
} from "./translators/table";
import { TranslationTool } from "./lib/internal";

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
   * const translatedTreeExpression = tree("Linux\n  Android\n  Debian\n    Ubuntu\n      Lubuntu\n      Kubuntu\n      Xubuntu\n      Xubuntu\n    Mint\n  Centos\n  Fedora", { style: "Unicode 2" });
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
  /**
   * Translation function for Table expressions.
   *
   * @param expression - The table expression to be translated.
   * @param options - Options for table translation.
   * @returns The translated table expression.
   * @example
   * const translatedTableExpression = tree("Column 1,Column 2,Column 3\nC++,Web,Assembly\nJavascript,CSS,HTML", { style: "Unicode double" });
   * console.log(translatedTableExpression)
   * // ╔══════════╦════════╦════════╗
   * // ║Column 1  ║Column 2║Column 3║
   * // ╠══════════╬════════╬════════╣
   * // ║C++       ║Web     ║Assembly║
   * // ╠══════════╬════════╬════════╣
   * // ║Javascript║CSS     ║HTML    ║
   * // ╚══════════╩════════╩════════╝
   */
  table: (expression: string, options?: TableTranslationOptions) => string;
};

export const translate: Translator = {
  math,
  sequence,
  tree,
  table,
};

export type {
  MathTranslationOptions,
  MathTranslationStyle,
  SequenceTranslationOptions,
  TreeTranslationOptions,
  TreeTranslationStyle,
  TableTranslationOptions,
  TableTranslationStyle,
  TranslationTool,
};

export {
  MATH_TRANSLATION_STYLES,
  TREE_TRANSLATION_STYLES,
  TABLE_TRANSLATION_STYLES,
};
