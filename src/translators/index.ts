import { _init } from "src/lib/internal";
import { FrameTranslationOptions, frame } from "./frame";
import { GrammarTranslationOptions, grammar } from "./grammar";
import { graphDAG } from "./graph-dag";
import { MathTranslationOptions, math } from "./math";
import { SequenceTranslationOptions, sequence } from "./sequence";
import { TableTranslationOptions, table } from "./table";
import { TreeTranslationOptions, tree } from "./tree";

type Translator = {
  /**
   * Translation function for mathematical expressions.
   *
   * @param expression - The expression to be translated.
   * @param options - Options for translation.
   * @returns The translated expression.
   * @example
   * const translatedMathExpression = translate.math("f(x) = 1 + x / (1 + x)", { style: "Unicode" });
   * console.log(translatedMathExpression)
   * //               x
   * // f(x) = 1 + ─────
   * //            1 + x
   */
  math: (expression: string, options?: MathTranslationOptions) => string;
  /**
   * Translation function for sequence expressions.
   *
   * @param expression - The expression to be translated.
   * @param options - Options for translation.
   * @returns The translated expression.
   * @example
   * const translatedSequenceExpression = translate.sequence("Alice -> Bob: Hello Bob!\nAlice <- Bob: Hello Alice!", { "asciiOnly": false })
   * console.log(translatedSequenceExpression)
   * // ┌─────┐       ┌───┐
   * // │Alice│       │Bob│
   * // └──┬──┘       └─┬─┘
   * //    │            │
   * //    │ Hello Bob! │
   * //    │───────────>│
   * //    │            │
   * //    │Hello Alice!│
   * //    │<───────────│
   * // ┌──┴──┐       ┌─┴─┐
   * // │Alice│       │Bob│
   * // └─────┘       └───┘
   */
  sequence: (
    expression: string,
    options?: SequenceTranslationOptions,
  ) => string;
  /**
   * Translation function for Tree expressions.
   *
   * @param expression - The tree expression to be translated.
   * @param options - Options for tree translation.
   * @returns The translated tree expression.
   * @example
   * const translatedTreeExpression = tree("Linux\n  Android\n  Debian\n    Ubuntu\n      Lubuntu\n      Kubuntu\n      Xubuntu\n      Xubuntu\n    Mint\n  Centos\n  Fedora", { style: "Unicode 2" });
   * console.log(translatedTreeExpression)
   * //  Linux
   * //   ├──Android
   * //   ├──Debian
   * //   │   ├──Ubuntu
   * //   │   │   ├──Lubuntu
   * //   │   │   ├──Kubuntu
   * //   │   │   ├──Xubuntu
   * //   │   │   └──Xubuntu
   * //   │   └──Mint
   * //   ├──Centos
   * //   └──Fedora
   */
  tree: (expression: string, options?: TreeTranslationOptions) => string;
  /**
   * Translation function for Table expressions.
   *
   * @param expression - The table expression to be translated.
   * @param options - Options for table translation.
   * @returns The translated table expression.
   * @example
   * const translatedTableExpression = tree("Column 1,Column 2,Column 3\nC++,Web,Assembly\nJavascript,CSS,HTML", { style: "Unicode double" });
   * console.log(translatedTableExpression)
   * // ╔══════════╦════════╦════════╗
   * // ║Column 1  ║Column 2║Column 3║
   * // ╠══════════╬════════╬════════╣
   * // ║C++       ║Web     ║Assembly║
   * // ╠══════════╬════════╬════════╣
   * // ║Javascript║CSS     ║HTML    ║
   * // ╚══════════╩════════╩════════╝
   */
  table: (expression: string, options?: TableTranslationOptions) => string;
  /**
   * Translation function for Grammar expressions.
   *
   * @param expression - The grammar expression to be translated.
   * @param options - Options for grammar translation.
   * @returns The translated grammar expression.
   * @example
   * const translatedGrammarExpression = grammar(`\nURL = domain [path] [attributes] [fragment]\n\ndomain = scheme "://" [credential] host [port] \n\nscheme = "http" / "https"\n\ncredential = username [":" password]"@"\n\nhost = 1*(subdomain ".") domain\n\nport = ":" number\n\npath = "/" \n\nattributes = "?" attribute-key-value *("&" attribute-key-value)\n\nattribute-key-pair = key ["=" value]\n`, { input: "abnf", output: "unicode" });
   * console.log(translatedGrammarExpression)
   * //  URL:
   * //                   ╭────>─────╮  ╭───────>────────╮  ╭──────>───────╮
   * //                   │          │  │                │  │              │
   * //     │├── domain ──╯── path ──╰──╯── attributes ──╰──╯── fragment ──╰──┤│
   * //
   * //  domain:
   * //                            ╭───────>────────╮          ╭────>─────╮
   * //                            │                │          │          │
   * //     │├── scheme ── "://" ──╯── credential ──╰── host ──╯── port ──╰──┤│
   * //
   * //  scheme:
   * //     │├──╮── "http"/i ───╭──┤│
   * //         │               │
   * //         ╰── "https"/i ──╯
   * //
   * //  credential:
   * //                     ╭──────────>──────────╮
   * //                     │                     │
   * //     │├── username ──╯── ":" ── password ──╰── "@" ──┤│
   * //
   * // host:
   * //     │├──╭── subdomain ── "." ──╮── domain ──┤│
   * //         │                      │
   * //         ╰──────────<───────────╯
   * //
   * // port:
   * //     │├── ":" ── number ──┤│
   * //
   * // path:
   * //     │├── "/" ──┤│
   * //
   * // attributes:
   * //     │├── "?" ──╭── attribute-key-value ──╮──┤│
   * //                │                         │
   * //                ╰────────── "&" ──────────╯
   * //
   * // attribute-key-pair:
   * //                ╭────────>─────────╮
   * //                │                  │
   * //     │├── key ──╯── "=" ── value ──╰──┤│
   */
  grammar: (expression: string, options?: GrammarTranslationOptions) => string;
  /**
   * Translation function for Frame expressions.
   *
   * @param expression - The Frame expression to be translated.
   * @param options - Options for frame translation.
   * @returns The translated frame expression.
   * @example
   * const translatedFrameExpression = frame("#include <iostream>\nusing namespace std;\n\nint main() \n{\n    cout << \"Hello, World!\";\n    return 0;\n}", { asciiOnly: false, lineNumber: true });
   * console.log(translatedFrameExpression)
   * // ┌─┬────────────────────────────┐
   * // │1│#include <iostream>         │
   * // │2│using namespace std;        │
   * // │3│                            │
   * // │4│int main()                  │
   * // │5│{                           │
   * // │6│    cout << "Hello, World!";│
   * // │7│    return 0;               │
   * // │8│}                           │
   * // └─┴────────────────────────────┘
   */
  frame: (expression: string, options?: FrameTranslationOptions) => string;
  /**
   * Translation function for DAG expressions.
   *
   * @param expression - The DAG expression to be translated.
   * @param options - Options for DAG translation.
   * @returns The translated DAG expression.
   * @example
   * const translatedDAGExpression = tree("socks -> shoes\nunderwear -> shoes\nunderwear -> pants\npants -> shoes\npants -> belt\nbelt -> jacket\nshirt -> belt\nshirt -> tie\ntie -> jacket\n" });
   * console.log(translatedDAGExpression)
   * // ┌─────┐┌─────────┐┌─────┐
   * // │socks││underwear││shirt│
   * // └┬────┘└┬─┬──────┘└┬─┬──┘
   * //  │      │┌▽─────┐  │┌▽───────┐
   * //  │      ││pants │  ││tie     │
   * //  │      │└┬──┬──┘  │└┬───────┘
   * // ┌▽──────▽─▽┐┌▽─────▽┐│
   * // │shoes     ││belt   ││
   * // └──────────┘└┬──────┘│
   * // ┌────────────▽───────▽┐
   * // │jacket               │
   * // └─────────────────────┘
   */
  graphDAG: (expression: string) => string;
};

export type DiagonType = {
  translate: Translator;
};

export const init = async ({
  wasmUrl,
}: { wasmUrl?: string } = {}): Promise<DiagonType> => {
  await _init({ wasmUrl });

  return {
    translate: {
      math,
      sequence,
      table,
      tree,
      grammar,
      frame,
      graphDAG,
    },
  };
};
