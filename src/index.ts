import { TranslationTool } from "./lib/internal";
import { DiagonType, init } from "./translators";
import { FrameTranslationOptions } from "./translators/frame";
import {
  GrammarTranslationOptions,
  GrammarTranslationInputs,
  GrammarTranslationOutputs,
  GRAMMAR_TRANSLATION_INPUTS,
  GRAMMAR_TRANSLATION_OUTPUTS,
} from "./translators/grammar";
import {
  MATH_TRANSLATION_STYLES,
  MathTranslationOptions,
  MathTranslationStyle,
} from "./translators/math";
import { SequenceTranslationOptions } from "./translators/sequence";
import {
  TABLE_TRANSLATION_STYLES,
  TableTranslationOptions,
  TableTranslationStyle,
} from "./translators/table";
import {
  TREE_TRANSLATION_STYLES,
  TreeTranslationOptions,
  TreeTranslationStyle,
} from "./translators/tree";

export type {
  MathTranslationOptions,
  MathTranslationStyle,
  SequenceTranslationOptions,
  TreeTranslationOptions,
  TreeTranslationStyle,
  TableTranslationOptions,
  TableTranslationStyle,
  GrammarTranslationOptions,
  GrammarTranslationInputs,
  GrammarTranslationOutputs,
  FrameTranslationOptions,
  DiagonType,
  TranslationTool,
};

export {
  GRAMMAR_TRANSLATION_INPUTS,
  GRAMMAR_TRANSLATION_OUTPUTS,
  MATH_TRANSLATION_STYLES,
  TABLE_TRANSLATION_STYLES,
  TREE_TRANSLATION_STYLES,
};

export { init } from "./translators";
export default {
  init,
};
