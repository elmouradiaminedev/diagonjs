import { expect, describe, it, beforeAll } from "vitest";
import Diagon, { DiagonType, SequenceTranslationOptions } from "src";

function generateAllOptions(): SequenceTranslationOptions[] {
  const allOptions: SequenceTranslationOptions[] = [];

  for (const asciiOnly of [true, false]) {
    for (const interpretBackSlashN of [true, false]) {
      allOptions.push({
        asciiOnly,
        interpretBackSlashN,
      });
    }
  }

  return allOptions;
}

let diagon: DiagonType;

beforeAll(async () => {
  diagon = await Diagon.init();
});

describe("Sequence expression translation", () => {
  generateAllOptions().forEach((options) => {
    describe(`With options ${JSON.stringify(options)}`, () => {
      it("should translate basic", () => {
        expect(
          diagon.translate.sequence(
            "Alice -> Bob: Hello Bob!\nAlice <- Bob: Hello Alice!",
            options,
          ),
        ).toMatchSnapshot();
      });

      it("should translate more actors", () => {
        expect(
          diagon.translate.sequence(
            "Renderer -> Browser: BeginNavigation()\nBrowser -> Network: URLRequest()\nBrowser <- Network: URLResponse()\nRenderer <- Browser: CommitNavigation()\nRenderer -> Browser: DidCommitNavigation()",
            options,
          ),
        ).toMatchSnapshot();
      });

      it("should translate actors order", () => {
        expect(
          diagon.translate.sequence(
            "Actor 2 -> Actor 3: message 1\nActor 1 -> Actor 2: message 2\n\nActor 1:\nActor 2:\nActor 3:",
            options,
          ),
        ).toMatchSnapshot();
      });

      it("should translate message order", () => {
        expect(
          diagon.translate.sequence(
            "2) Actor 2 -> Actor 3: message 1\n1) Actor 1 -> Actor 2: message 2\n\nActor 1:\nActor 2: 1<2\nActor 3:",
            options,
          ),
        ).toMatchSnapshot();
      });

      it("should translate message crossing", () => {
        expect(
          diagon.translate.sequence(
            "1) Renderer -> Browser: Message 1\n2) Renderer <- Browser: Message 2\n\nRenderer: 1<2\nBrowser: 2<1",
            options,
          ),
        ).toMatchSnapshot();
      });
    });
  });
});
