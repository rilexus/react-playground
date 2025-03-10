import React from "react";
import Scatter from "./components/scatter/Scatter";
import { useEffect, useRef, useState } from "react";

import Table from "./components/Table/Table";
import useCSVTextArea from "./hooks/useCSVTextArea/useCSVTextArea";

const sum = (array) => {
  return array.reduce((acc, currentValue) => acc + currentValue, 0);
};

const min = (array) => {
  return array.reduce((acc, current) => {
    if (current < acc) {
      return current;
    }
    return acc;
  }, Infinity);
};

const distance = (point1, point2 /* [x1, y1], [x2, y2] */) => {
  if (point1.length !== point2.length) {
    throw new Error("");
  }
  let res = 0;
  for (let i = 0; i < point1.length; i++) {
    const x2 = point2[i];
    const x1 = point1[i];
    res = sum([res, (x2 - x1) ** 2]);
  }

  return res ** 0.5;
};

const knn = (point, points, count = 2) => {
  const distances = [];

  points.forEach((p, index) => {
    distances.push([distance(point, p), index]);
  });

  distances.sort(([distance1], [distance2]) => distance1 - distance2);

  return distances.slice(0, count).map(([_, i]) => i);
};

let indexToHighlight = [];

const scatterConfig = {
  data: {
    datasets: [
      {
        type: "scatter",
        hoverBorderWidth: 15,
        hoverBorderColor: "red",
        label: "Size/Price",
        radius: (element) => {
          let index = element.index;
          if (indexToHighlight.includes(index)) {
            return 10;
          }
          return 5;
        },
        pointBackgroundColor: (element) => {
          let index = element.index;
          if (indexToHighlight.includes(index)) {
            return "red";
          }
          return "rgb(99,167,255)";
        },
        data: [],
        backgroundColor: "rgb(99,167,255)",
      },
      {
        type: "line",
        label: "B",
        data: [],
      },
    ],
  },
  options: {
    scales: {
      x: {
        type: "linear",
        position: "bottom",
      },
    },
  },
};

const slope = (point1, point2 /* [x1,y1],[x2,y2] */) => {
  return (point2[1] - point1[1]) / (point2[0] - point1[0]);
};

const linear = (array, callback) => {
  return array.map((x) => [x, callback(x)]);
};

function App() {
  const [csvArray, textAreaBinding] = useCSVTextArea(
    "Area, Price\n10, 50\n20, 60\n30, 70"
  );
  const [_, ...data] = csvArray;

  const chartRef = useRef(null);
  const [amountOfPoints, setValue] = useState(2);

  useEffect(() => {
    scatterConfig.data.datasets[0].data = data.map((row) => ({
      x: row[0],
      y: row[1],
    }));

    chartRef.current?.update();
  }, [data]);

  return (
    <div className="App">
      <Scatter
        ref={chartRef}
        config={scatterConfig}
        onHover={(e, elements, chart) => {
          if (elements[0]) {
            const [{ index, datasetIndex }] = elements;
            const { x, y } = chart.data.datasets[datasetIndex].data[index];

            const data = scatterConfig.data.datasets[0].data.map(({ x, y }) => [
              x,
              y,
            ]);

            indexToHighlight = knn([x, y], data, amountOfPoints);
            chart.update();
          } else {
            if (indexToHighlight.length) {
              indexToHighlight = [];
              chart.update();
            }
          }
        }}
      />
      <div>
        <div>
          <label>
            Amount of Points <br />
            <input
              type="number"
              value={amountOfPoints}
              placeholder={"Nearest points"}
              onChange={(e) => {
                const { value } = e.target;
                setValue(value);
              }}
            />
          </label>
        </div>
        <div>
          <label htmlFor="csv-textarea">
            CSV - Input
            <br />
            <textarea
              placeholder={"Add CSV Data"}
              name="csv-textarea"
              id="csv-input"
              cols="30"
              rows="10"
              {...textAreaBinding}
            />
          </label>
        </div>
        <div>
          <Table data={csvArray} />
        </div>
      </div>
    </div>
  );
}

export default App;
