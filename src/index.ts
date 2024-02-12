import { init } from "./translators";

export { TranslationTool } from "./lib/internal";
export { DiagonType, init } from "./translators";
export { FrameTranslationOptions } from "./translators/frame";
export {
  GrammarTranslationOptions,
  GrammarTranslationInputs,
  GrammarTranslationOutputs,
  GRAMMAR_TRANSLATION_INPUTS,
  GRAMMAR_TRANSLATION_OUTPUTS,
} from "./translators/grammar";
export {
  MATH_TRANSLATION_STYLES,
  MathTranslationOptions,
  MathTranslationStyle,
} from "./translators/math";
export { SequenceTranslationOptions } from "./translators/sequence";
export {
  TABLE_TRANSLATION_STYLES,
  TableTranslationOptions,
  TableTranslationStyle,
} from "./translators/table";
export {
  TREE_TRANSLATION_STYLES,
  TreeTranslationOptions,
  TreeTranslationStyle,
} from "./translators/tree";

export default {
  init,
};
