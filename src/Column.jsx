import React, { forwardRef } from "react";

const Column = forwardRef(({ item, style, children }, ref) => {
  return (
    <div
      ref={ref}
      style={{
        ...style,
      }}
      className="base draggable"
    >
      Column: {item.id}
      {children}
    </div>
  );
});
export default Column;
