import MemoryGrid from "../MemoryGrid.vue";
import { componentMountFactory } from "../../test/componentTestFactory.js";
import { fetchImagesByQuery } from "../../api/giphyClient.js";

jest.mock("../../api/giphyClient.js");
const mountComponent = componentMountFactory(MemoryGrid);

describe("MemoryGrid", () => {
  it("Mounts", () => {
    fetchImagesByQuery.mockImplementation(() =>
      Promise.resolve(() => Promise.resolve({ data: [] }))
    );
    const wrapper = mountComponent();
    expect(wrapper.exists()).toBeTruthy();
  });
});
