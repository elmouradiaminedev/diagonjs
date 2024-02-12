import { expect, describe, it, beforeAll } from "vitest";
import Diagon, {
  DiagonType,
  TREE_TRANSLATION_STYLES,
  TreeTranslationOptions,
} from "src";

function generateAllOptions(): TreeTranslationOptions[] {
  const allOptions: TreeTranslationOptions[] = [];

  for (const style of TREE_TRANSLATION_STYLES) {
    allOptions.push({
      style,
    });
  }

  return allOptions;
}

let diagon: DiagonType;

beforeAll(async () => {
  diagon = await Diagon.init();
});

describe("Tree expression translation", () => {
  generateAllOptions().forEach((options) => {
    describe(`With options ${JSON.stringify(options)}`, () => {
      it("should translate a simple tree", () => {
        expect(
          diagon.translate.tree(
            "Linux\n  Android\n  Debian\n    Ubuntu\n      Lubuntu\n      Kubuntu\n      Xubuntu\n      Xubuntu\n    Mint\n  Centos\n  Fedora",
            options,
          ),
        ).toMatchSnapshot();
      });
    });
  });
});
