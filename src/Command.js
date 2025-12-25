import shortid from "shortid";
import {
  handleMoveSidebarComponentIntoParent,
  handleMoveToDifferentParent,
  handleMoveWithinParent,
} from "./helpers";
import { COLUMN, COMPONENT, SIDEBAR_ITEM } from "./constants";

export class Command {
  constructor(execute, reverse) {
    this.execute = execute;
    this.reverse = reverse;
  }

  execute(state) {
    return state;
  }
  reverse(state) {
    return state;
  }
}

export const dropElementComand = (dropZone, item) => {
  return new Command(
    function (layout) {
      console.log("dropZone", dropZone);
      console.log("item", item);

      const splitDropZonePath = dropZone.path.split(".");
      const pathToDropZone = splitDropZonePath.slice(0, -1).join(".");

      const newItem = { id: item.id, type: item.type };
      if (item.type === COLUMN) {
        newItem.children = item.children;
      }

      // sidebar into
      if (item.type === SIDEBAR_ITEM) {
        // 1. Move sidebar item into page
        const newComponent = {
          id: shortid.generate(),
          ...item.component,
        };
        const newItem = {
          id: newComponent.id,
          type: COMPONENT,
        };

        return handleMoveSidebarComponentIntoParent(
          layout,
          splitDropZonePath,
          newItem
        );
      }

      // move down here since sidebar items dont have path
      const splitItemPath = item.path.split(".");
      const pathToItem = splitItemPath.slice(0, -1).join(".");

      // 2. Pure move (no create)
      if (splitItemPath.length === splitDropZonePath.length) {
        // 2.a. move within parent
        if (pathToItem === pathToDropZone) {
          return handleMoveWithinParent(
            layout,
            splitDropZonePath,
            splitItemPath
          );
        }

        // 2.b. OR move different parent
        // TODO FIX columns. item includes children

        return handleMoveToDifferentParent(
          layout,
          splitDropZonePath,
          splitItemPath,
          newItem
        );
      }

      // 3. Move + Create
      return handleMoveToDifferentParent(
        layout,
        splitDropZonePath,
        splitItemPath,
        newItem
      );
    },
    function (state) {
      return state;
    }
  );
};
