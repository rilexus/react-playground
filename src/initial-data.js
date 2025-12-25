import shortid from "shortid";
import { ROW, COLUMN } from "./constants";

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
                  children: [],
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
                  children: [],
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
                  children: [],
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
                  children: [],
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
          children: [],
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
          type: "column",
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
                  children: [],
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
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default initialData;
