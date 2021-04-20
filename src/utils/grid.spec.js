import {
  buildGrid,
  removeFromDisplayedGrid,
  shuffle,
  setClickedOnGridItem,
} from "./grid.js";

const sampleGridItems = ["test1", "test2"];
const sampleGrid = [
  { slug: "test1", display: true, key: "test1-1", clicked: false },
  { slug: "test2", display: true, key: "test2-1", clicked: false },
];

describe("buildGrid", () => {
  it("Properly builds grid", () => {
    const grid = buildGrid(sampleGridItems);
    expect(grid).toStrictEqual([
      {
        slug: "test2",
        key: "test2-1",
        clicked: false,
        display: true,
        sibling: {
          slug: "test2",
          key: "test2-2",
          clicked: false,
          display: true,
        },
      },
      {
        slug: "test2",
        key: "test2-2",
        clicked: false,
        display: true,
        sibling: {
          slug: "test2",
          key: "test2-1",
          clicked: false,
          display: true,
        },
      },
      {
        slug: "test1",
        key: "test1-1",
        clicked: false,
        display: true,
        sibling: {
          slug: "test1",
          key: "test1-2",
          clicked: false,
          display: true,
        },
      },
      {
        slug: "test1",
        key: "test1-2",
        clicked: false,
        display: true,
        sibling: {
          slug: "test1",
          key: "test1-1",
          clicked: false,
          display: true,
        },
      },
    ]);
  });
  test("Siblings are references to actual tiles", () => {
    const grid = buildGrid([{ slug: "test" }]);
    expect(grid[0].sibling === grid[1]);
  });
});

describe("removeFromDisplayedGrid", () => {
  it("Properly sets display property on tiles on grid", () => {
    expect(removeFromDisplayedGrid("test1", sampleGrid)).toStrictEqual([
      { slug: "test1", key: "test1-1", display: false, clicked: false },
      { slug: "test2", key: "test2-1", display: true, clicked: false },
    ]);
  });
});

describe("setClickedOnGridItem", () => {
  it("Properly sets clicked property on tiles on grid", () => {
    expect(setClickedOnGridItem("test1-1", true, sampleGrid)).toStrictEqual([
      { slug: "test1", key: "test1-1", display: true, clicked: true },
      { slug: "test2", key: "test2-1", display: true, clicked: false },
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
