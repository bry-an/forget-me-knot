import { selectItem, calculateGameProgress } from "./gameComposables.js";

const sampleGrid = [
  { slug: "test2", sibling: { slug: "test2" } },
  { slug: "test2", sibling: { slug: "test2" } },
  { slug: "test1", sibling: { slug: "test1" } },
  { slug: "test1", sibling: { slug: "test1" } },
];
describe("selectItem", () => {
  it("Returns function that properly tests two items are the same", () => {
    const isMatch = selectItem(sampleGrid[0]);
    expect(isMatch(sampleGrid[1])).toBe(true);
    expect(isMatch(sampleGrid[2])).toBe(false);
  });
});

describe("calculateGameProgress", () => {
  it("Calculates game progress correctly", () => {
    const calculateSpecificGameProgress = calculateGameProgress(24);
    expect(calculateSpecificGameProgress(24)).toBe(1);
    expect(calculateSpecificGameProgress(0)).toBe(0);
    expect(calculateSpecificGameProgress(12)).toBe(0.5);
  });
});
