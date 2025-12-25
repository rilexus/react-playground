export const getAccept = ({ type }) => {
  switch (type) {
    case "row":
      return ["column"];
    case "layout":
      return ["row"];
    case "column":
      return ["row", "text"];
    default:
      return [];
  }
};
