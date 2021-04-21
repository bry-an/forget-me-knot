import map from "ramda/src/map";
import {
  buildGrid,
  removeFromDisplayedGrid,
  shuffle,
  setClickedOnGridItem,
  resetGrid,
} from "./grid.js";
import { sampleGridItems, sampleGrid } from "./__mocks__/sampleGridItems.js";
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

describe("resetGrid", () => {
  it("Properly resets grid", () => {
    const completedGrid = map((o) => (o.display = false), sampleGrid);
    expect(resetGrid(completedGrid).every((o) => o.display === true));
  });
});
