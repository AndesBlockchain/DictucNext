import React from "react";

const FranjaAzul = ({color}) => {
  const colorFinal = color || "azul-dictuc";
  
  return (
    <div className="flex justify-center mb-2">
      <div className={`rounded-full bg-${colorFinal}`} style={{width: '20px', height: '4px'}}></div>
    </div>
  );
};

export default FranjaAzul; 