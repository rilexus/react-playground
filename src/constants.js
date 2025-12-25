import shortid from "shortid";

export const SIDEBAR_ITEM = "sidebarItem";
export const ROW = "row";
export const COLUMN = "column";
export const COMPONENT = "component";

export const SIDEBAR_ITEMS = [
  {
    type: "text",
    id: shortid.generate(),
    props: {
      style: {},
    },
    children: ["Some"],
  },

  {
    type: "row",
    id: shortid.generate(),
    props: {
      style: {
        border: "1px solid red",
        padding: 0,
      },
    },
    children: [],
  },
  {
    type: "column",
    id: shortid.generate(),
    props: {
      style: {
        border: "1px solid blue",
        padding: "10px",
      },
    },
    children: [],
  },
];
