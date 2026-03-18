import React from "react";

const BarraFondoGris = ({ children, className = "" }) => (
  <div className={"absolute text-sm xl:text-2xl 2xl:text-2xl top-10 left-0 w-2/5 min-h-1/6 z-5 bg-gray-600 opacity-85 text-white px-6 pl-16 py-3 uppercase " + className}>
    {children}
  </div>
);

export default BarraFondoGris; 