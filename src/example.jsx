import React, { useState, useCallback } from "react";
import TrashDropZone from "./TrashDropZone";
import SideBarItem from "./SideBarItem";

import initialData from "./initial-data";
import {
  handleMoveWithinParent,
  handleMoveToDifferentParent,
  handleMoveSidebarComponentIntoParent,
  handleRemoveItemFromLayout,
} from "./helpers";

import { SIDEBAR_ITEMS } from "./constants";

import { dropElementComand } from "./Command";
import { DraggableChild } from "./DraggableChild";

const Container = () => {
  const initialLayout = initialData.layout;
  const initialComponents = initialData.components;
  const [layout, setLayout] = useState(initialLayout);
  const [components, setComponents] = useState(initialComponents);

  const handleDropToTrashBin = useCallback(
    (dropZone, item) => {
      const splitItemPath = item.path.split(".");
      setLayout(handleRemoveItemFromLayout(layout, splitItemPath));
    },
    [layout]
  );

  const handleDrop = useCallback(
    (dropZone, item) => {
      setLayout((layout) => {
        return dropElementComand(dropZone, item).execute(layout);
      });
    },
    [layout, components]
  );

  return (
    <div className="body">
      <div className="sideBar">
        {Object.values(SIDEBAR_ITEMS).map((sideBarItem, index) => (
          <SideBarItem key={sideBarItem.id} data={sideBarItem} />
        ))}
      </div>
      <div className="pageContainer">
        <div className="page">
          <DraggableChild
            item={{
              id: "layout",
              type: "layout",
              children: layout,
            }}
            handleDrop={handleDrop}
            path={""}
          />
        </div>

        <TrashDropZone
          data={{
            layout,
          }}
          onDrop={handleDropToTrashBin}
        />
      </div>
    </div>
  );
};
export default Container;
