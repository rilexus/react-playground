import React, { useRef } from "react";
import DropZone from "./DropZone";
import { getComponent } from "./getComponent";
import { useDrag } from "react-dnd";

export const DraggableChild = ({ item, handleDrop, path, className }) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    item: {
      type: item.type,
      id: item.id,
      children: item.children,
      path,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  const Component = getComponent(item);

  drag(ref);

  return (
    <Component
      {...item.props}
      item={item}
      style={{ ...item.props?.style, opacity }}
      path={path}
      ref={ref}
    >
      {item.children.map((item, index) => {
        const currentPath = path === "" ? `${index}` : `${path}.${index}`;

        return (
          <React.Fragment key={item.id}>
            <DropZone
              type={item.type}
              data={{
                path: currentPath,
                childrenCount: item.children.length,
              }}
              onDrop={handleDrop}
              className={className}
            />
            <DraggableChild
              key={item.id}
              {...item.props}
              style={{ ...item.props.style, opacity }}
              item={item}
              handleDrop={handleDrop}
              path={currentPath}
            />
          </React.Fragment>
        );
      })}
      <DropZone
        type={item.type}
        data={{
          path:
            path === ""
              ? `${item.children.length}`
              : `${path}.${item.children.length}`,
          childrenCount: item.children.length,
        }}
        onDrop={handleDrop}
        className={className}
        isLast
      />
    </Component>
  );
};
