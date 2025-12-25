import shortid from "shortid";
import { COMPONENT, ROW, COLUMN } from "./constants";

const initialData = {
  layout: [
    {
      type: ROW,
      id: "row0",
      props: {
        style: {
          border: "1px solid red",
          padding: 0,
        },
      },
      children: [
        {
          type: "column",
          id: "column0",
          props: {
            style: {
              border: "1px solid blue",
              flex: "1 1 100%",
              padding: "10px",
            },
          },
          children: [
            {
              type: "row",
              id: shortid(),
              props: {
                style: {
                  border: "1px solid red",
                  padding: 0,
                },
              },
              children: [
                {
                  type: "column",
                  id: shortid(),
                  props: {
                    style: {
                      border: "1px solid blue",
                      flex: "1 1 100%",
                      padding: "10px",
                    },
                  },
                  children: [
                    // {
                    //   type: COMPONENT,
                    //   id: "component2",
                    // },
                  ],
                },
                {
                  type: "column",
                  id: shortid(),
                  props: {
                    style: {
                      border: "1px solid blue",
                      flex: "1 1 100%",
                      padding: "10px",
                    },
                  },
                  children: [
                    // {
                    //   type: COMPONENT,
                    //   id: "component2",
                    // },
                  ],
                },
              ],
            },

            {
              type: "row",
              id: shortid(),
              props: {
                style: {
                  border: "1px solid red",
                  padding: 0,
                },
              },
              children: [
                {
                  type: "column",
                  id: shortid(),
                  props: {
                    style: {
                      border: "1px solid blue",
                      flex: "1 1 100%",
                      padding: "10px",
                    },
                  },
                  children: [
                    // {
                    //   type: COMPONENT,
                    //   id: "component2",
                    // },
                  ],
                },
                {
                  type: "column",
                  id: shortid(),
                  props: {
                    style: {
                      border: "1px solid blue",
                      flex: "1 1 100%",
                      padding: "10px",
                    },
                  },
                  children: [
                    // {
                    //   type: COMPONENT,
                    //   id: "component2",
                    // },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: COLUMN,
          id: "column1",
          props: {
            style: {
              border: "1px solid blue",
              flex: "1 1 100%",
              padding: "10px",
            },
          },
          children: [
            // {
            //   type: COMPONENT,
            //   id: "component2",
            // },
          ],
        },
      ],
    },
    {
      type: ROW,
      id: "row1",
      props: {
        style: {
          border: "1px solid red",
          padding: 0,
        },
      },
      children: [
        {
          type: COLUMN,
          id: "column2",
          props: {
            style: {
              border: "1px solid blue",
              flex: "1 1 100%",
              padding: "10px",
            },
          },
          children: [
            {
              type: "row",
              id: shortid(),
              props: {
                style: {
                  border: "1px solid red",
                  padding: 0,
                },
              },
              children: [
                {
                  type: "column",
                  id: shortid(),
                  props: {
                    style: {
                      border: "1px solid blue",
                      flex: "1 1 100%",
                      padding: "10px",
                    },
                  },
                  children: [
                    // {
                    //   type: COMPONENT,
                    //   id: "component2",
                    // },
                  ],
                },
                {
                  type: "column",
                  id: shortid(),
                  props: {
                    style: {
                      border: "1px solid blue",
                      flex: "1 1 100%",
                      padding: "10px",
                    },
                  },
                  children: [
                    // {
                    //   type: COMPONENT,
                    //   id: "component2",
                    // },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  components: {
    component0: { id: "component0", type: "input", children: ["Some input"] },
    component1: { id: "component1", type: "image", children: ["Some image"] },
    component2: { id: "component2", type: "email", children: ["Some email"] },
    component3: { id: "component3", type: "name", children: ["Some name"] },
    component4: { id: "component4", type: "phone", children: ["Some phone"] },
  },
};

export default initialData;
