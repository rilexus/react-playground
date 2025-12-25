import React, { forwardRef } from "react";

const style = {
  border: "1px dashed black",
  padding: "0.5rem 1rem",
  backgroundColor: "white",
  cursor: "move",
};
const Component = forwardRef(({ item, components, path }, ref) => {
  const component = components[item.id];

  return (
    <div ref={ref} style={{ ...style }} className="component draggable">
      <div>{item.id}</div>
      <div>{component.children}</div>
    </div>
  );
});
export default Component;
