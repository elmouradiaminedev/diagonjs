import { expect, describe, it, beforeAll } from "vitest";
import Diagon, {
  DiagonType,
  MATH_TRANSLATION_STYLES,
  MathTranslationOptions,
} from "src";

function generateAllOptions(): MathTranslationOptions[] {
  const allOptions: MathTranslationOptions[] = [];

  for (const style of MATH_TRANSLATION_STYLES) {
    for (const transformMathLetters of [true, false]) {
      allOptions.push({
        style,
        transformMathLetters,
      });
    }
  }

  return allOptions;
}

let diagon: DiagonType;

beforeAll(async () => {
  diagon = await Diagon.init();
});

describe("Math expression translation", () => {
  generateAllOptions().forEach((options) => {
    describe(`With options ${JSON.stringify(options)}`, () => {
      it("should translate fraction", () => {
        expect(
          diagon.translate.math("f(x) = 1 + x / (1 + x)", options),
        ).toMatchSnapshot();
      });

      it("should translate square root", () => {
        expect(
          diagon.translate.math("sqrt(1+sqrt(1+x/2))", options),
        ).toMatchSnapshot();
      });

      it("should translate subscript", () => {
        expect(
          diagon.translate.math("S_n = u_1 + u_2 + ... + u_n", options),
        ).toMatchSnapshot();
      });

      it("should translate summation", () => {
        expect(
          diagon.translate.math("sum(i^2,i=0,n) = n^3/2+n^2/2+n/6", options),
        ).toMatchSnapshot();
      });

      it("should translate integral", () => {
        expect(
          diagon.translate.math("int(x^2 * dx ,0,1) = n^3/3", options),
        ).toMatchSnapshot();
      });

      it("should translate product", () => {
        expect(
          diagon.translate.math(
            "mult(i^2,i=1,n) = (mult(i,i=1,n))^2\n\n\n\nmult(1/2,1,100) = 7.8886091e-31",
            options,
          ),
        ).toMatchSnapshot();
      });

      it("should translate vector", () => {
        expect(
          diagon.translate.math("[a;b] + [c;d] = [a+c; b+d]", options),
        ).toMatchSnapshot();
      });

      it("should translate matrix", () => {
        expect(
          diagon.translate.math(
            "[1,2;3,4] * [x;y] = [1*x+2*y; 3*x+4*y]",
            options,
          ),
        ).toMatchSnapshot();
      });

      it("should translate factorial", () => {
        expect(
          diagon.translate.math("[n;k] = n! / (k! *(n-k)!)", options),
        ).toMatchSnapshot();
      });

      it("should translate quoted string", () => {
        expect(
          diagon.translate.math('"x_n"\n x_n\n', options),
        ).toMatchSnapshot();
      });

      it("should translate braces vs parenthesis", () => {
        expect(
          diagon.translate.math("A_(1+2)\n\nA_{1+2}\n\nA^{1+2}\n", options),
        ).toMatchSnapshot();
      });

      it("should translate math symbols", () => {
        expect(
          diagon.translate.math(
            "Alpha + alpha + Digamma + digamma + Kappa + kappa + Omicron \nomicron + Upsilon + upsilon + Beta + beta + Zeta + zeta + Lambda \nlambda + Pi + pi + Phi + phi + Gamma + gamma + Eta + eta + Mu + mu \nRho + rho + Chi + chi + Delta + delta + Theta + theta + Nu + nu \nSigma + sigma + Psi + psi + Epsilon + epsilon + Iota + iota + Xi\nxi + Tau + tau + Omega + omega",
            options,
          ),
        ).toMatchSnapshot();
      });

      it("should translate mathbb", () => {
        expect(
          diagon.translate.math(
            "mathbb(R)\n\nbb(R)\n\nbb(ABCDEFGHIJKLMNOPQRSTUVWXYZ)\n\nbb(abcdefghijklmnopqrstuvwxyz)\n\nbb(0123456789)",
            options,
          ),
        ).toMatchSnapshot();
      });

      it("should translate continued fraction", () => {
        expect(
          diagon.translate.math(
            "psi = 1 + 1/(1+1/(1+1/(1+1/(1+...))))",
            options,
          ),
        ).toMatchSnapshot();
      });

      it("should translate limits", () => {
        expect(
          diagon.translate.math("lim(x -> infinity, 1/x) = 0", options),
        ).toMatchSnapshot();
      });
    });
  });
});
