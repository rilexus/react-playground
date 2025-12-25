import React, { useRef } from "react";
import { useDrag } from "react-dnd";
import { COLUMN } from "./constants";
import { DraggableChild } from "./DraggableChild";

const Column = ({ item, components, handleDrop, path, style }) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    item: {
      type: COLUMN,
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
    <div
      ref={ref}
      style={{
        ...style,
        opacity,
      }}
      className="base draggable"
    >
      {item.id}
      <DraggableChild
        item={item}
        handleDrop={handleDrop}
        components={components}
        path={path}
      />
    </div>
  );
};
export default Column;
