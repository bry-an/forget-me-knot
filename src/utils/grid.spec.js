import { buildGrid, removeFromGrid, shuffle } from "./grid.js";

const sampleGridItems = ["test1", "test2"];
const sampleGrid = [{ slug: "test1" }, { slug: "test2" }];

describe("buildGrid", () => {
  it("Properly builds grid", () => {
    const grid = buildGrid(sampleGridItems);
    expect(grid).toStrictEqual([
      {
        slug: "test2",
        key: "test2-1",
        clicked: false,
        sibling: { slug: "test2", key: "test2-2", clicked: false },
      },
      {
        slug: "test2",
        key: "test2-2",
        clicked: false,
        sibling: { slug: "test2", key: "test2-1", clicked: false },
      },
      {
        slug: "test1",
        key: "test1-1",
        clicked: false,
        sibling: { slug: "test1", key: "test1-2", clicked: false },
      },
      {
        slug: "test1",
        key: "test1-2",
        clicked: false,
        sibling: { slug: "test1", key: "test1-1", clicked: false },
      },
    ]);
  });
  test("Siblings are references to actual tiles", () => {
    const grid = buildGrid([{ slug: "test" }]);
    expect(grid[0].sibling === grid[1]);
  });
});

describe("removeFrom", () => {
  it("Properly removes tiles from grid", () => {
    expect(removeFromGrid("test1", sampleGrid)).toStrictEqual([
      { slug: "test2" },
    ]);
  });
});

describe("Shuffle", () => {
  it("Returns array of same size with keys and data unmutated", () => {
    const sampleArr = [{ name: "test1" }, { name: "test2" }, { name: "test3" }];
    const shuffled = shuffle(sampleArr);
    expect(shuffled.length).toBe(sampleArr.length);
    expect(Object.keys(shuffled)).toStrictEqual(Object.keys(sampleArr));
    expect(sampleArr.filter((name) => name === "test1")).toStrictEqual(
      shuffled.filter((name) => name === "test1")
    );
  });
});
