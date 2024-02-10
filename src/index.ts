import DiagonCore from "@vendors/diagon";
import { camelToUnderscore } from "./utils";

export type TranslateOperation = "Math";

export type BaseTranslateStyle = "Unicode" | "ASCII" | "Latex";

type _TranslateFunction = (
  operation: TranslateOperation,
  statement: string,
  options: string
) => string;

export type TranslateMathOptions = {
  style?: BaseTranslateStyle;
  transformMathLetters?: boolean;
};

const Diagon = {
  _translate: DiagonCore.cwrap("translate", "string", [
    "string",
    "string",
    "string",
  ]) as _TranslateFunction,
  _stringifyOptions: function (options: any): string {
    let result = "";
    for (const key in options) {
      if (Object.prototype.hasOwnProperty.call(options, key)) {
        const underscoreKey = camelToUnderscore(key);
        const value = options[key];
        result += `${underscoreKey}\n${value}\n`;
      }
    }
    return result;
  },
  translate: {
    math: function (statement: string, options?: TranslateMathOptions) {
      return Diagon._translate(
        "Math",
        statement,
        Diagon._stringifyOptions(options)
      );
    },
  },
};

export default Diagon;
