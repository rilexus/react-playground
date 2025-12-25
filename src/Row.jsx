import React, { forwardRef, useRef } from "react";
import { useDrag } from "react-dnd";
import { ROW } from "./constants";
import { DraggableChild } from "./DraggableChild";

const Row = forwardRef(({ item, components, handleDrop, path, style }) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ROW,
      id: item.id,
      children: item.children,
      path,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(ref);

  return (
    <div ref={ref} style={{ ...style, opacity }} className="base draggable">
      Row: {item.id}
      <div className="columns">
        <DraggableChild
          item={item}
          handleDrop={handleDrop}
          components={components}
          path={path}
          className="horizontalDrag"
        />
      </div>
    </div>
  );
});
export default Row;
