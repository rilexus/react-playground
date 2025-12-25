import Column from "./Column";
import Component from "./Component";
import Row from "./Row";

export const getComponent = ({type}) => {
  switch (type) {
    case "row":
      return Row;
    case "column":
      return Column;
    case "component":
      return Component;
    default:
      return null;
  }
};
