import { _createTranslationFunction } from "../lib/internal";

export type FrameTranslationOptions = {
  asciiOnly?: boolean;
  lineNumber?: boolean;
};

export const frame =
  _createTranslationFunction<FrameTranslationOptions>("Frame");
