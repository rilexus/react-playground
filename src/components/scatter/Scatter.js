import React, { forwardRef } from "react";
import ChartJS from "../ChartJS/ChartJS";

const Scatter = forwardRef(({ config, onClick, onHover }, ref) => {
  return (
    <ChartJS
      ref={ref}
      config={{ type: "scatter", ...config }}
      onClick={onClick}
      onHover={onHover}
    />
  );
});

export default Scatter;
