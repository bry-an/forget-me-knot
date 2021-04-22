import flushPromises from "flush-promises";
import MemoryGrid from "../MemoryGrid.vue";
import { componentMountFactory } from "../../test/componentTestFactory.js";

jest.mock("../../api/giphyClient.js", () => ({
  fetchImagesByQuery: () =>
    Promise.resolve({ json: () => Promise.resolve({ data: [] }) }),
}));
const mountComponent = componentMountFactory(MemoryGrid);

describe("MemoryGrid", () => {
  it("Mounts", () => {
    const wrapper = mountComponent();
    expect(wrapper.exists()).toBeTruthy();
  });
});

describe("Set answer and status methods", () => {
  test("setStatusMessage reverts back to default after timeout", async () => {
    const wrapper = mountComponent();
    wrapper.vm.setStatusMessage(wrapper.vm.statusMessages.right);
    await flushPromises();
    expect(wrapper.vm.statusMessage).toBe(wrapper.vm.statusMessages.default);
  });
  test("setAnswer reverts back to default after timeout", async () => {
    const wrapper = mountComponent();
    wrapper.vm.setAnswer("wrongAnswer");
    await flushPromises();
    expect(wrapper.vm.wrongAnswer).toBe(false);
  });
  test("checkCorrectSelection checks if sibling key of first tile matches key of second tile", () => {
    // these tiles represent identical images since they are siblings
    const firstTile = { key: "test-key-1", sibling: { key: "test-key-2" } };
    const secondTile = { key: "test-key-2", sibling: { key: "test-key-1" } };
    const wrapper = mountComponent();
    wrapper.vm.selectedTile = firstTile;
    expect(wrapper.vm.checkCorrectSelection(secondTile)).toBe(true);
  });
});
describe("selectTile", () => {
  it("Will unset selected tile if same tile clicked", () => {
    const tile = { key: "test-key-1", sibling: { key: "test-key-2" } };
    const wrapper = mountComponent();
    wrapper.vm.selectedTile = tile;
    wrapper.vm.selectTile(tile);
    expect(wrapper.vm.selectedTile).toBe(null);
  });
  it("Sets status and method correctly if correct selection", () => {
    // these tiles represent identical images since they are siblings
    const firstTile = { key: "test-key-1", sibling: { key: "test-key-2" } };
    const secondTile = { key: "test-key-2", sibling: { key: "test-key-1" } };
    const wrapper = mountComponent();
    wrapper.vm.setStatusMessage = jest.fn();
    wrapper.vm.setAnswer = jest.fn();
    wrapper.vm.selectedTile = firstTile;
    wrapper.vm.selectTile(secondTile);
    expect(wrapper.vm.setAnswer).toHaveBeenCalledWith("rightAnswer");
    expect(wrapper.vm.setStatusMessage).toHaveBeenCalledWith(
      wrapper.vm.statusMessages.right
    );
  });
  it("Sets status and method correctly if incorrect selection", () => {
    // tiles represent different images
    const firstTile = { key: "test-key-1", sibling: { key: "test-key-2" } };
    const secondTile = { key: "LOL", sibling: { key: "LOL" } };
    const wrapper = mountComponent();
    wrapper.vm.setStatusMessage = jest.fn();
    wrapper.vm.setAnswer = jest.fn();
    wrapper.vm.selectedTile = firstTile;
    wrapper.vm.selectTile(secondTile);
    expect(wrapper.vm.setAnswer).toHaveBeenCalledWith("wrongAnswer");
    expect(wrapper.vm.setStatusMessage).toHaveBeenCalledWith(
      wrapper.vm.statusMessages.wrong
    );
  });
});

describe("End of game", () => {
  test("sets gameIsRunning to false and displays won message if no items displayed", () => {
    const sampleGrid = [{ slug: "test-slug-1", display: true }];
    const wrapper = mountComponent();
    wrapper.vm.grid = sampleGrid;
    wrapper.vm.hideTile(sampleGrid[0]);
    // watchers are deferred to next update cycle
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.gameIsRunning).toBe(false);
      expect(wrapper.vm.statusMessage).toBe(wrapper.vm.statusMessages.won);
    });
  });
  test("Displays game-over text", () => {
    const sampleGrid = [{ slug: "test-slug-1", display: true }];
    const wrapper = mountComponent();
    wrapper.vm.grid = sampleGrid;
    wrapper.vm.hideTile(sampleGrid[0]);
    const gameOverDiv = wrapper.find("[data-test=game-over]");
    wrapper.vm.$nextTick(() => {
      expect(gameOverDiv.exists()).toBeTruthy();
    });
  });
});
