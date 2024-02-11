import { expect, describe, it } from "vitest";
import Diagon, { TreeTranslationOptions, TreeTranslationStyle } from "../dist";

function generateAllOptions(): TreeTranslationOptions[] {
  const styles: TreeTranslationStyle[] = [
    "unicode 1",
    "unicode 2",
    "ASCII 1",
    "ASCII 2",
    "ASCII 3",
    "unicode right top",
    "unicode right center",
    "unicode right bottom",
  ];

  const allOptions: TreeTranslationOptions[] = [];

  for (const style of styles) {
    allOptions.push({
      style,
    });
  }

  return allOptions;
}

describe("Tree expression translation", () => {
  generateAllOptions().forEach((options) => {
    describe(`With options ${JSON.stringify(options)}`, () => {
      it("should translate a simple tree", () => {
        expect(
          Diagon.translate.tree(
            "Linux\n  Android\n  Debian\n    Ubuntu\n      Lubuntu\n      Kubuntu\n      Xubuntu\n      Xubuntu\n    Mint\n  Centos\n  Fedora",
            options,
          ),
        ).toMatchSnapshot();
      });
    });
  });
});
