import { _createTranslationFunction } from "../lib/internal";

export const TABLE_TRANSLATION_STYLES = [
  "unicode",
  "unicode bold",
  "unicode rounded",
  "unicode double",
  "unicode with bold header",
  "unicode with double header",
  "unicode cells",
  "unicode cells 2",
  "ascii",
  "ascii rounded",
  "ascii with header 1",
  "ascii with header 2",
  "ascii light header",
  "ascii light header/separator",
  "ascii light header/separator/border",
  "ascii light separator/border",
  "ascii light border",
  "conceptual",
] as const;

export type TableTranslationStyle = (typeof TABLE_TRANSLATION_STYLES)[number];

export type TableTranslationOptions = {
  style?: TableTranslationStyle;
};

export const table =
  _createTranslationFunction<TableTranslationOptions>("Table");
