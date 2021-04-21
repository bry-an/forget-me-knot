import MemoryGridTile from "../MemoryGridTile.vue";
import { shallowMount } from "@vue/test-utils";

const visibleSampleTile = {
  slug:
    "https://media0.giphy.com/media/3otPotnGlA5FSF2fKw/200.gif?cid=efc6841ejd0hn2k52nkal7r914iiteuuttvc571t7krnx9ye&rid=200.gif&ct=g",
  key:
    "https://media0.giphy.com/media/3otPotnGlA5FSF2fKw/200.gif?cid=efc6841ejd0hn2k52nkal7r914iiteuuttvc571t7krnx9ye&rid=200.gif&ct=g-2",
  clicked: false,
  display: true,
  sibling: {
    slug:
      "https://media0.giphy.com/media/3otPotnGlA5FSF2fKw/200.gif?cid=efc6841ejd0hn2k52nkal7r914iiteuuttvc571t7krnx9ye&rid=200.gif&ct=g",
    key:
      "https://media0.giphy.com/media/3otPotnGlA5FSF2fKw/200.gif?cid=efc6841ejd0hn2k52nkal7r914iiteuuttvc571t7krnx9ye&rid=200.gif&ct=g-1",
    clicked: false,
    display: true,
  },
};

const nonvisibleSampleTile = {
  ...visibleSampleTile,
  display: false,
};

describe("MemoryGridTile", () => {
  it("Mounts", () => {
    const wrapper = shallowMount(MemoryGridTile);
    expect(wrapper.exists()).toBeTruthy();
  });
  it("Correctly loads the tile's image in the card's underside", () => {
    const wrapper = shallowMount(MemoryGridTile, {
      propsData: {
        tile: visibleSampleTile,
      },
    });
    expect(wrapper.find("[data-test=image-under-tile]").attributes().src).toBe(
      visibleSampleTile.slug
    );
  });
  it("Does not show tile if visible set to false", () => {
    const wrapper = shallowMount(MemoryGridTile, {
      propsData: {
        tile: nonvisibleSampleTile,
      },
    });
    expect(wrapper.find("[data-test=flip-tile]").isVisible()).toBe(false);
  });
  it("Matches visible snapshot", () => {
    const wrapper = shallowMount(MemoryGridTile, {
      propsData: {
        tile: visibleSampleTile,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("Matches nonvisible snapshot", () => {
    const wrapper = shallowMount(MemoryGridTile, {
      propsData: {
        tile: nonvisibleSampleTile,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
