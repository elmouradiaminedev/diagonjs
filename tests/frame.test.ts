import { expect, describe, it } from "vitest";
import Diagon, { FrameTranslationOptions } from "src";

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

describe("Frame expression translation", () => {
  generateAllOptions().forEach((options) => {
    describe(`With options ${JSON.stringify(options)}`, () => {
      it("should translate code frame hello world", () => {
        expect(
          Diagon.translate.frame(
            '#include <iostream>\nusing namespace std;\n\nint main() \n{\n    cout << "Hello, World!";\n    return 0;\n}',
            options,
          ),
        ).toMatchSnapshot();
      });
    });
  });
});
