import { expect, it } from "vitest";
import Diagon from "src";

it("should return the same instance if initialized twice", async () => {
  const diagonOne = await Diagon.init();
  const diagonTwo = await Diagon.init();

  expect(diagonOne).toEqual(diagonTwo);
});
