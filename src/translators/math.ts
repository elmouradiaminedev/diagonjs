import { createTranslationFunction } from "../lib/internal";

/**
 * Represents the style of mathematical expression translation.
 */
export type MathTranslationStyle = "Unicode" | "ASCII" | "Latex";

/**
 * Options for mathematical expression translation.
 */
export type MathTranslationOptions = {
  style?: MathTranslationStyle;
  transformMathLetters?: boolean;
};

export const math = createTranslationFunction<MathTranslationOptions>("Math");