import { init } from "./translators";

export type { TranslationTool } from "./lib/internal";
export { type DiagonType, init } from "./translators";
export type { FrameTranslationOptions } from "./translators/frame";
export type {
  GrammarTranslationOptions,
  GrammarTranslationInputs,
  GrammarTranslationOutputs,
  GRAMMAR_TRANSLATION_INPUTS,
  GRAMMAR_TRANSLATION_OUTPUTS,
} from "./translators/grammar";
export type {
  MATH_TRANSLATION_STYLES,
  MathTranslationOptions,
  MathTranslationStyle,
} from "./translators/math";
export type { SequenceTranslationOptions } from "./translators/sequence";
export type {
  TABLE_TRANSLATION_STYLES,
  TableTranslationOptions,
  TableTranslationStyle,
} from "./translators/table";
export type {
  TREE_TRANSLATION_STYLES,
  TreeTranslationOptions,
  TreeTranslationStyle,
} from "./translators/tree";

export default {
  init,
};
