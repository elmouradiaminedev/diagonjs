import { createTranslationFunction } from "../lib/internal";

export const MATH_TRANSLATION_STYLES = ["Unicode", "ASCII", "Latex"] as const;

/**
 * Represents the style of mathematical expression translation.
 */
export type MathTranslationStyle = (typeof MATH_TRANSLATION_STYLES)[number];

/**
 * Options for mathematical expression translation.
 */
export type MathTranslationOptions = {
  style?: MathTranslationStyle;
  transformMathLetters?: boolean;
};

export const math = createTranslationFunction<MathTranslationOptions>("Math");
