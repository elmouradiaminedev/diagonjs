import { expect, describe, it, beforeAll } from "vitest";
import Diagon, { DiagonType, FrameTranslationOptions } from "src";

function generateAllOptions(): FrameTranslationOptions[] {
  const allOptions: FrameTranslationOptions[] = [];

  for (const asciiOnly of [true, false]) {
    for (const lineNumber of [true, false]) {
      allOptions.push({
        asciiOnly,
        lineNumber,
      });
    }
  }

  return allOptions;
}

let diagon: DiagonType;

beforeAll(async () => {
  diagon = await Diagon.init();
});

describe("Frame expression translation", () => {
  generateAllOptions().forEach((options) => {
    describe(`With options ${JSON.stringify(options)}`, () => {
      it("should translate code frame hello world", () => {
        expect(
          diagon.translate.frame(
            '#include <iostream>\nusing namespace std;\n\nint main() \n{\n    cout << "Hello, World!";\n    return 0;\n}',
            options,
          ),
        ).toMatchSnapshot();
      });
    });
  });
});
