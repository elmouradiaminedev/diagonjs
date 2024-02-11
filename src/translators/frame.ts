import { createTranslationFunction } from "../lib/internal";

/**
 * Options for frame expression translation.
 */
export type FrameTranslationOptions = {
  asciiOnly?: boolean;
  lineNumber?: boolean;
};

export const frame =
  createTranslationFunction<FrameTranslationOptions>("Frame");
