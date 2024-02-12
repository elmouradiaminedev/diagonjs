import { _createTranslationFunction } from "../lib/internal";

export const MATH_TRANSLATION_STYLES = ["Unicode", "ASCII", "Latex"] as const;

export type MathTranslationStyle = (typeof MATH_TRANSLATION_STYLES)[number];

export type MathTranslationOptions = {
  style?: MathTranslationStyle;
  transformMathLetters?: boolean;
};

export const math = _createTranslationFunction<MathTranslationOptions>("Math");
