import { createTranslationFunction } from "../lib/internal";

/**
 * Represents the possible styles for tree translation.
 */
export type TreeTranslationStyle =
  | "Unicode 1"
  | "Unicode 2"
  | "ASCII 1"
  | "ASCII 2"
  | "ASCII 3"
  | "Unicode right top"
  | "Unicode right center"
  | "Unicode right bottom";

/**
 * Options for tree expression translation.
 */
export type TreeTranslationOptions = {
  style?: TreeTranslationStyle;
};

export const tree = createTranslationFunction<TreeTranslationOptions>("Tree");
