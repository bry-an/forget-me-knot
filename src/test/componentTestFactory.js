import { shallowMount } from "@vue/test-utils";

const componentMountFactory = (component) => (options) =>
  shallowMount(component, options);

export { componentMountFactory };
