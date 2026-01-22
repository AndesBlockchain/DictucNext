import React from "react";

const SeparadorHorizontal = () => (
  <div style={{ display: "flex", alignItems: "center", margin: "16px 0" }}>
    <div style={{ flex: 1, height: 1, background: "#ccc" }} />
    <span style={{ margin: "0 12px", color: "#888", fontWeight: "bold" }}>o</span>
    <div style={{ flex: 1, height: 1, background: "#ccc" }} />
  </div>
);

export default SeparadorHorizontal; 