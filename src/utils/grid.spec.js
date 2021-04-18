import { buildGrid, removeFrom } from "./grid.js";

const sampleGridItems = ["test1", "test2"];
const sampleGrid = [{ slug: "test1" }, { slug: "test2" }];

describe("buildGrid", () => {
  it("Properly builds grid", () => {
    const grid = buildGrid(sampleGridItems);
    expect(grid).toStrictEqual([
      { slug: "test2", sibling: { slug: "test2" } },
      { slug: "test2", sibling: { slug: "test2" } },
      { slug: "test1", sibling: { slug: "test1" } },
      { slug: "test1", sibling: { slug: "test1" } },
    ]);
  });
  test("Siblings are references to actual tiles", () => {
    const grid = buildGrid([{ slug: "test" }]);
    expect(grid[0].sibling === grid[1]);
  });
});

describe("removeFrom", () => {
  it("Properly removes tiles from grid", () => {
    const removeSlugFromGrid = removeFrom(sampleGrid);
    const filteredGrid = removeSlugFromGrid("test1");
    expect(filteredGrid).toStrictEqual([{ slug: "test2" }]);
  });
});
