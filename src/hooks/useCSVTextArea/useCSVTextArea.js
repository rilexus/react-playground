import React from "react";
import { useMemo, useState } from "react";

function isNumeric(str) {
  if (typeof str != "string") return false; // we only process strings!
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
}

const CSVToArray = (data, delimiter = ",", omitFirstRow = false) =>
  data
    .slice(omitFirstRow ? data.indexOf("\n") + 1 : 0)
    .split("\n") /* new line */
    .map((row) =>
      row
        .split(delimiter)
        .map((value) => (isNumeric(value) ? Number(value) : value))
    );

const useCSVTextArea = (initialValue = "") => {
  const [csvString, setCSVString] = useState(initialValue);

  return [
    useMemo(() => CSVToArray(csvString), [csvString]),
    {
      value: csvString,
      onChange: (e) => {
        const { value } = e.target;
        setCSVString(value);
      },
    },
  ];
};

export default useCSVTextArea;
