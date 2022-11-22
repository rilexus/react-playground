/**
 * Note: This file would need to bundle its own dependencies.
 */
const Lazy = ({ value }) => {
  return createElement("div", null, [`Lazy Loaded Component: ${value}`]);
};

window.Lazy = Lazy;
