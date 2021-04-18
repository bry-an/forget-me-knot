import { buildGrid } from "./grid.js";

const sampleGridItems = ["test1", "test2"];

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
});
