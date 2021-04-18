const setReactive = (reactive) => (val) => {
  reactive.value = val;
  return reactive;
};
const getReactive = (reactive) => reactive.value;

export { setReactive, getReactive };
