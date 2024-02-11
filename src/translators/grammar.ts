import { createTranslationFunction } from "../lib/internal";

export const GRAMMAR_TRANSLATION_INPUTS = [
  "abnf",
  "bnf",
  "iso-ebnf",
  "rbnf",
  "wsn",
] as const;

export const GRAMMAR_TRANSLATION_OUTPUTS = [
  "unicode",
  "ascii",
  "svg",
  "html5",
  "xhtml5",
  "ebnfhtml5",
  "ebnfxhtml5",
  "abnf",
] as const;

export type GrammarTranslationInputs =
  (typeof GRAMMAR_TRANSLATION_INPUTS)[number];
export type GrammarTranslationOutputs =
  (typeof GRAMMAR_TRANSLATION_OUTPUTS)[number];

export type GrammarTranslationOptions = {
  input?: GrammarTranslationInputs;
  output?: GrammarTranslationOutputs;
};

export const grammar =
  createTranslationFunction<GrammarTranslationOptions>("Grammar");
