import React from "react";

const NumberDisplay = ({ number }) => {
  return (
    <div
      style={{
        fontSize: "3rem",
        fontWeight: "bold",
        color: "#FFF287",
        marginTop: "1rem",
      }}
    >
      Now Serving: <span style={{ color: "#FFD700" }}>{number}</span>
    </div>
  );
};

export default NumberDisplay;
