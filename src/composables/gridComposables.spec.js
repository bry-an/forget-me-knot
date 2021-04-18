import {
  grid,
  removeSlugFromGrid,
  buildReactiveGrid,
} from "./gridComposables.js";
import { getReactive } from "./composableUtilities.js";

const sampleGridItems = ["test1", "test2"];

describe("Build reactive grid", () => {
  it("Builds a grid and sets reactive properly", () => {
    buildReactiveGrid(sampleGridItems);
    expect(getReactive(grid)).toStrictEqual([
      { slug: "test2", sibling: { slug: "test2" } },
      { slug: "test2", sibling: { slug: "test2" } },
      { slug: "test1", sibling: { slug: "test1" } },
      { slug: "test1", sibling: { slug: "test1" } },
    ]);
  });
});

describe("Remove slug from grid", () => {
  test("Curried function retains reactive grid", () => {
    buildReactiveGrid(sampleGridItems);
    removeSlugFromGrid("test1");
    removeSlugFromGrid("test2");
    expect(getReactive(grid)).toStrictEqual([]);
  });
});
