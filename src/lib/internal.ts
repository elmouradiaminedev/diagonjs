import DiagonModule from "@vendors/diagon";
import { camelToUnderscore } from "../utils";

export const TRANSLATION_TOOLS = [
  "Math",
  "Sequence",
  "Tree",
  "Table",
  "Grammar",
  "Frame",
  "GraphDAG",
] as const;

export type TranslationTool = (typeof TRANSLATION_TOOLS)[number];

type TranslationFunction = (
  tool: TranslationTool,
  expression: string,
  options: string,
) => string;

type TranslationOptions = { [key: string]: string | number | boolean };

let diagonModule: Awaited<ReturnType<typeof DiagonModule>> | undefined;

let _translate: TranslationFunction;

export const _init = async () => {
  if (diagonModule) {
    return;
  }

  diagonModule = await DiagonModule();
  _translate = diagonModule.cwrap("translate", "string", [
    "string",
    "string",
    "string",
  ]);
};

const _stringifyOptions = (options: TranslationOptions): string =>
  Object.entries(options)
    .map(([key, value]) => `${camelToUnderscore(key)}\n${value}\n`)
    .join("");

export const _createTranslationFunction =
  <T extends TranslationOptions>(tool: TranslationTool) =>
  (expression: string, options: T = {} as T): string => {
    return _translate(tool, expression, _stringifyOptions(options));
  };
