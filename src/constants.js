import shortid from "shortid";

export const SIDEBAR_ITEM = "sidebarItem";
export const ROW = "row";
export const COLUMN = "column";
export const COMPONENT = "component";

export const SIDEBAR_ITEMS = [
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: "text",
      id: shortid.generate(),
      props: {
        style: {},
      },
      children: ["Some"],
    },
  },

  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
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
  },
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: "column",
      id: shortid.generate(),
      props: {
        style: {
          border: "1px solid blue",
          flex: "1 1 100%",
          padding: "10px",
        },
      },
      children: [],
    },
  },
];
