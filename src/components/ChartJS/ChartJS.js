import { Chart, registerables } from "chart.js";
import React, { forwardRef, useEffect, useRef } from "react";

Chart.register(...registerables);
const ChartJS = forwardRef(({ config, onClick, onHover }, outsideRef) => {
  const ref = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    config.options.onClick = onClick;
    config.options.onHover = onHover;
  }, [onHover, onClick]);

  useEffect(() => {
    chartRef.current = new Chart(ref.current, config);
    if (outsideRef) {
      outsideRef.current = chartRef.current;
    }
    return () => {
      chartRef.current.destroy();
      if (outsideRef) {
        outsideRef.cuurent = null;
      }
    };
  }, []);

  return <canvas ref={ref}></canvas>;
});

export default ChartJS;
