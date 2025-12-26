import React, { useRef } from "react";
import classNames from "classnames";
import { useDrop } from "react-dnd";

const DropZone = ({ data, onDrop, isLast, className, type }) => {
  const ref = useRef(null);
  const [{ isOver, canDrop, isDragging }, drop] = useDrop({
    accept: data.accept,
    drop: (item, monitor) => {
      onDrop(data, item);
    },
    canDrop: (item, monitor) => {
      const dropZonePath = data.path;
      const splitDropZonePath = dropZonePath.split(".");
      const itemPath = item.path;

      // sidebar items can always be dropped anywhere
      if (itemPath === undefined) {
        return true;
      }

      const splitItemPath = itemPath.split(".");

      // Invalid (Can't drop a parent element (row) into a child (column))
      const parentDropInChild = splitItemPath.length < splitDropZonePath.length;
      if (parentDropInChild) return false;

      // Current item can't possible move to it's own location
      if (itemPath === dropZonePath) return false;

      // Current area
      if (splitItemPath.length === splitDropZonePath.length) {
        const pathToItem = splitItemPath.slice(0, -1).join(".");
        const currentItemIndex = Number(splitItemPath.slice(-1)[0]);

        const pathToDropZone = splitDropZonePath.slice(0, -1).join(".");
        const currentDropZoneIndex = Number(splitDropZonePath.slice(-1)[0]);

        if (pathToItem === pathToDropZone) {
          const nextDropZoneIndex = currentItemIndex + 1;
          if (nextDropZoneIndex === currentDropZoneIndex) return false;
        }
      }

      return true;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      isDragging: monitor.getItemType(),
    }),
  });

  drop(ref);

  const isActive = isOver && canDrop;

  if (!isDragging) return <div ref={ref} style={{ height: 0, width: 0 }} />;

  return (
    <div
      ref={ref}
      className={classNames({ isLast }, className)}
      style={{
        flex: "0 0 auto",
        transition: "200ms all",
        ...(canDrop ? { background: "#b6e1faff" } : {}),
        ...(isActive ? { background: "#0070b0ff" } : {}),
        ...(type === "row"
          ? {
              width: 40,
              height: 40,
            }
          : {
              height: 40,
            }),
      }}
    />
  );
};
export default DropZone;
