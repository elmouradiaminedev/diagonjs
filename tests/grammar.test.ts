import { expect, describe, it, beforeAll } from "vitest";
import Diagon, {
  DiagonType,
  GRAMMAR_TRANSLATION_OUTPUTS,
  GrammarTranslationOptions,
} from "src";

function generateAllOptions(): GrammarTranslationOptions[] {
  const allOptions: GrammarTranslationOptions[] = [];

  for (const output of GRAMMAR_TRANSLATION_OUTPUTS) {
    allOptions.push({
      output,
    });
  }

  return allOptions;
}

let diagon: DiagonType;

beforeAll(async () => {
  diagon = await Diagon.init();
});

describe("Grammar expression translation", () => {
  generateAllOptions().forEach((options) => {
    describe(`With options ${JSON.stringify(options)}`, () => {
      it("should translate a simple ABNF - URL", () => {
        expect(
          diagon.translate.grammar(
            `\nURL = domain [path] [attributes] [fragment]\n\ndomain = scheme "://" [credential] host [port] \n\nscheme = "http" / "https"\n\ncredential = username [":" password]"@"\n\nhost = 1*(subdomain ".") domain\n\nport = ":" number\n\npath = "/" \n\nattributes = "?" attribute-key-value *("&" attribute-key-value)\n\nattribute-key-pair = key ["=" value]\n`,
            {
              ...options,
              input: "abnf",
            },
          ),
        ).toMatchSnapshot();
      });

      it("should translate a simple ABNF - URL", () => {
        expect(
          diagon.translate.grammar(
            `nsource-list       = *WSP [ source-expression *( 1*WSP source-expression ) *WSP ]\n                  / *WSP "'none'" *WSP\n\nsource-expression = scheme-source\n                  / host-source\n                  / keyword-source\n                  / nonce-source\n                  / hash-source\n\nscheme-source     = scheme-part ":"\n\nhost-source       = [ scheme-part "://" ] host-part [ port-part ] [ path-part ]\n\nkeyword-source    = "'self'"\n                  / "'unsafe-inline'"\n                  / "'unsafe-eval'"\n\n\nbase64-value      = 1*( ALPHA / DIGIT / "+" / "/" )*2( "=" )\n\nnonce-value       = base64-value\n\nhash-value        = base64-value\n\nnonce-source      = "'nonce-" nonce-value "'"\n\nhash-algo         = "sha256"\n                  / "sha384"\n                  / "sha512"\n\nhash-source       = "'" hash-algo "-" hash-value "'"\n\nscheme-part       = <scheme production from RFC 3986, section 3.1>\n\nhost-part         = "*" / [ "*." ] 1*host-char *( "." 1*host-char )\n\nhost-char         = ALPHA\n                  / DIGIT\n                  / "-"\n\npath-part         = <path production from RFC 3986, section 3.3>\n\nport-part         = ":" ( 1*DIGIT / "*" )\n`,
            {
              ...options,
              input: "abnf",
            },
          ),
        ).toMatchSnapshot();
      });

      it("should translate a ISO - EBNF", () => {
        expect(
          diagon.translate.grammar(
            '\nletter = "A" | "B" | "C" | "D" | "E" | "F" | "G"\n       | "H" | "I" | "J" | "K" | "L" | "M" | "N"\n       | "O" | "P" | "Q" | "R" | "S" | "T" | "U"\n       | "V" | "W" | "X" | "Y" | "Z" | "a" | "b"\n       | "c" | "d" | "e" | "f" | "g" | "h" | "i"\n       | "j" | "k" | "l" | "m" | "n" | "o" | "p"\n       | "q" | "r" | "s" | "t" | "u" | "v" | "w"\n       | "x" | "y" | "z" ;\ndigit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" ;\nsymbol = "[" | "]" | "{" | "}" | "(" | ")" | "<" | ">"\n       | "\'" | \'"\' | "=" | "|" | "." | "," | ";" ;\ncharacter = letter | digit | symbol | "_" ;\n \nidentifier = letter , { letter | digit | "_" } ;\nterminal = "\'" , character , { character } , "\'" \n         | \'"\' , character , { character } , \'"\' ;\n \nlhs = identifier ;\nrhs = identifier\n     | terminal\n     | "[" , rhs , "]"\n     | "{" , rhs , "}"\n     | "(" , rhs , ")"\n     | rhs , "|" , rhs\n     | rhs , "," , rhs ;\n\nrule = lhs , "=" , rhs , ";" ;\ngrammar = { rule } ;\n',
            {
              ...options,
              input: "iso-ebnf",
            },
          ),
        ).toMatchSnapshot();
      });

      it("should translate a simple ABNF - URL", () => {
        expect(
          diagon.translate.grammar(
            '\nSYNTAX     = { PRODUCTION } .\nPRODUCTION = IDENTIFIER "=" EXPRESSION "." .\nEXPRESSION = TERM { "|" TERM } .\nTERM       = FACTOR { FACTOR } .\nFACTOR     = IDENTIFIER\n          | LITERAL\n          | "[" EXPRESSION "]"\n          | "(" EXPRESSION ")"\n          | "{" EXPRESSION "}" .\nIDENTIFIER = letter { letter } .\nLITERAL    = """" character { character } """" .\n',
            {
              ...options,
              input: "wsn",
            },
          ),
        ).toMatchSnapshot();
      });
    });
  });
});
