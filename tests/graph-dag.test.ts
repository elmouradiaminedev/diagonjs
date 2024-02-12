import { expect, describe, it, beforeAll } from "vitest";
import Diagon, { DiagonType } from "src";

let diagon: DiagonType;

beforeAll(async () => {
  diagon = await Diagon.init();
});

describe("GraphDAG expression translation", () => {
  it("should translate clothes DAG", () => {
    expect(
      diagon.translate.graphDAG(
        "socks -> shoes\nunderwear -> shoes\nunderwear -> pants\npants -> shoes\npants -> belt\nbelt -> jacket\nshirt -> belt\nshirt -> tie\ntie -> jacket\n",
      ),
    ).toMatchSnapshot();
  });

  it("should translate chromium DAG", () => {
    expect(
      diagon.translate.graphDAG(
        "chrome -> content\nchrome -> blink\nchrome -> base\n\ncontent -> blink\ncontent -> net\ncontent -> base\n\nblink -> v8\nblink -> CC\nblink -> WTF\nblink -> skia\nblink -> base\nblink -> net\n\nweblayer -> content\nweblayer -> chrome\nweblayer -> base\n\nnet -> base\nWTF -> base\n",
      ),
    ).toMatchSnapshot();
  });

  it("should translate compilation DAG", () => {
    expect(
      diagon.translate.graphDAG(
        "random -> pool_urbg\nrandom -> nonsecure_base\nrandom -> seed_sequence\nrandom -> distribution\n\nnonsecure_base -> pool_urbg\nnonsecure_base -> salted_seed_seq\n\nseed_sequence -> pool_urbg\nseed_sequence -> salted_seed_seq\nseed_sequence -> seed_material\n\ndistribution -> strings\n\npool_urbg -> seed_material\n\nsalted_seed_seq -> seed_material\n\nseed_material -> strings\n",
      ),
    ).toMatchSnapshot();
  });
});
