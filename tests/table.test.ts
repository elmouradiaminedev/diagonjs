import { expect, describe, it, beforeAll } from "vitest";
import Diagon, {
  DiagonType,
  TABLE_TRANSLATION_STYLES,
  TableTranslationOptions,
} from "src";

let diagon: DiagonType;

beforeAll(async () => {
  diagon = await Diagon.init();
});

function generateAllOptions(): TableTranslationOptions[] {
  const allOptions: TableTranslationOptions[] = [];

  for (const style of TABLE_TRANSLATION_STYLES) {
    allOptions.push({
      style,
    });
  }

  return allOptions;
}

describe("Table expression translation", () => {
  generateAllOptions().forEach((options) => {
    describe(`With options ${JSON.stringify(options)}`, () => {
      it("should translate a simple table", () => {
        expect(
          diagon.translate.table(
            "Column 1,Column 2,Column 3\nC++,Web,Assembly\nJavascript,CSS,HTML",
            options,
          ),
        ).toMatchSnapshot();
      });
    });
  });
});
