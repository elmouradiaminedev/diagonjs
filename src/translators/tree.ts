import { createTranslationFunction } from "../lib/internal";

export const TREE_TRANSLATION_STYLES = [
  "unicode 1",
  "unicode 2",
  "ASCII 1",
  "ASCII 2",
  "ASCII 3",
  "unicode right top",
  "unicode right center",
  "unicode right bottom",
] as const;

/**
 * Represents the possible styles for tree translation.
 */
export type TreeTranslationStyle = (typeof TREE_TRANSLATION_STYLES)[number];

/**
 * Options for tree expression translation.
 */
export type TreeTranslationOptions = {
  style?: TreeTranslationStyle;
};

export const tree = createTranslationFunction<TreeTranslationOptions>("Tree");
