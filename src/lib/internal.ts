import DiagonModule from "@vendors/diagon";
import { camelToUnderscore } from "../utils";
import { version } from "../../package.json";

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

export const _init = async ({ wasmUrl }: { wasmUrl?: string } = {}) => {
  if (diagonModule) {
    return;
  }

  let wasmBinary;

  if (typeof window !== "undefined" || wasmUrl) {
    const response = await fetch(
      wasmUrl ??
        `https://cdn.jsdelivr.net/npm/diagonjs@${version}/dist/diagon.js-1.1.wasm`,
    );
    const buffer = await response.arrayBuffer();

    wasmBinary = buffer;
  }

  diagonModule = await DiagonModule({
    wasmBinary,
  });

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
