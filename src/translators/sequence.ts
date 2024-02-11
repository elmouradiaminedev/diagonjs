import { createTranslationFunction } from "../lib/internal";

/**
 * Options for sequence translation.
 */
export type SequenceTranslationOptions = {
  asciiOnly?: boolean;
  interpretBackSlashN?: boolean;
};

export const sequence =
  createTranslationFunction<SequenceTranslationOptions>("Sequence");
