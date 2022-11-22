import React from "react";

const Background = ({ children, color = "transparent" }) => {
  return (
    <div
      style={{
        background: color,
      }}
    >
      {children}
    </div>
  );
};

export default Background;
