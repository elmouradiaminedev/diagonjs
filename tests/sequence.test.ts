import { expect, describe, it } from "vitest";
import Diagon, { SequenceTranslationOptions } from "../dist";

function generateAllOptions(): SequenceTranslationOptions[] {
  const asciiOnlyOptions: boolean[] = [true, false];
  const interpretBackSlashNOptions: boolean[] = [true, false];

  const allOptions: SequenceTranslationOptions[] = [];

  for (const asciiOnly of asciiOnlyOptions) {
    for (const interpretBackSlashN of interpretBackSlashNOptions) {
      allOptions.push({
        asciiOnly,
        interpretBackSlashN,
      });
    }
  }

  return allOptions;
}

describe("Sequence expression translation", () => {
  generateAllOptions().forEach((options) => {
    describe(`With options ${JSON.stringify(options)}`, () => {
      it("should translate basic", () => {
        expect(
          Diagon.translate.sequence(
            "Alice -> Bob: Hello Bob!\nAlice <- Bob: Hello Alice!",
            options,
          ),
        ).toMatchSnapshot();
      });

      it("should translate more actors", () => {
        expect(
          Diagon.translate.sequence(
            "Renderer -> Browser: BeginNavigation()\nBrowser -> Network: URLRequest()\nBrowser <- Network: URLResponse()\nRenderer <- Browser: CommitNavigation()\nRenderer -> Browser: DidCommitNavigation()",
            options,
          ),
        ).toMatchSnapshot();
      });

      it("should translate actors order", () => {
        expect(
          Diagon.translate.sequence(
            "Actor 2 -> Actor 3: message 1\nActor 1 -> Actor 2: message 2\n\nActor 1:\nActor 2:\nActor 3:",
            options,
          ),
        ).toMatchSnapshot();
      });

      it("should translate message order", () => {
        expect(
          Diagon.translate.sequence(
            "2) Actor 2 -> Actor 3: message 1\n1) Actor 1 -> Actor 2: message 2\n\nActor 1:\nActor 2: 1<2\nActor 3:",
            options,
          ),
        ).toMatchSnapshot();
      });

      it("should translate message crossing", () => {
        expect(
          Diagon.translate.sequence(
            "1) Renderer -> Browser: Message 1\n2) Renderer <- Browser: Message 2\n\nRenderer: 1<2\nBrowser: 2<1",
            options,
          ),
        ).toMatchSnapshot();
      });
    });
  });
});
