import React, { forwardRef } from "react";

const Row = forwardRef(({ item, style, children }, ref) => {
  return (
    <div ref={ref} style={{ ...style }} className="base draggable">
      Row: {item.id}
      <div className="columns">{children}</div>
    </div>
  );
});
export default Row;
