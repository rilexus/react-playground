import React from "react";
import DropZone from "./DropZone";
import { getComponent } from "./getComponent";

export const DraggableChild = ({
  item,
  handleDrop,
  components,
  path,
  className,
}) => {
  return (
    <>
      {item.children.map((item, index) => {
        const currentPath = path === "" ? `${index}` : `${path}.${index}`;
        const Component = getComponent(item);

        return (
          <React.Fragment key={item.id}>
            <DropZone
              data={{
                path: currentPath,
                childrenCount: item.children.length,
              }}
              onDrop={handleDrop}
              className={className}
            />
            <Component
              key={item.id}
              {...item.props}
              item={item}
              components={components}
              path={currentPath}
            />
          </React.Fragment>
        );
      })}
      <DropZone
        data={{
          path: `${path}.${item.children.length}`,
          childrenCount: item.children.length,
        }}
        onDrop={handleDrop}
        className={className}
        isLast
      />
    </>
  );
};
