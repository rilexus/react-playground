import React, { forwardRef } from "react";
import ChartJS from "../ChartJS/ChartJS";

const Line = forwardRef(({ config, onClick, onHover }, ref) => {
  return (
    <ChartJS
      ref={ref}
      config={{ type: "line", ...config }}
      onClick={onClick}
      onHover={onHover}
    />
  );
});

export default Line;
