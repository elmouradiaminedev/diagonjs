import { _createTranslationFunction } from "../lib/internal";

export type SequenceTranslationOptions = {
  asciiOnly?: boolean;
  interpretBackSlashN?: boolean;
};

export const sequence =
  _createTranslationFunction<SequenceTranslationOptions>("Sequence");
