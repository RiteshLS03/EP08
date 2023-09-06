import React from "react";
import "./ShimarUI.css";

const ShimarUI = () => {
  return (
    <>
      {Array(20)
        .fill("")
        .map((e) => (
          <div className="container">
            <div className="emptyCard">
              <div className="image"></div>
              <div className="description"></div>
              <div className="price"></div>
            </div>
          </div>
        ))}
    </>
  );
};

export default ShimarUI;
