import { expect, describe, it } from "vitest";
import Diagon, {
  TREE_TRANSLATION_STYLES,
  TreeTranslationOptions,
} from "../dist";

function generateAllOptions(): TreeTranslationOptions[] {
  const allOptions: TreeTranslationOptions[] = [];

  for (const style of TREE_TRANSLATION_STYLES) {
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
