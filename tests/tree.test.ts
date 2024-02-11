import { expect, describe, it } from "vitest";
import Diagon, { TreeTranslationOptions, TreeTranslationStyle } from "../dist";

function generateAllOptions(): TreeTranslationOptions[] {
  const styles: TreeTranslationStyle[] = [
    "Unicode",
    "Unicode 2",
    "ASCII 1",
    "ASCII 2",
    "ASCII 3",
    "Unicode right top",
    "Unicode right center",
    "Unicode right bottom",
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
