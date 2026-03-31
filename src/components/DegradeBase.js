import React from "react";
import clsx from "clsx";

const DegradeBase = ({ color, toRight = true }) => {
    const colorFinal = color || "azul-dictuc";
    const degradeClasses = clsx(
        `min-h-[40px] -mt-16 mb-12 from-white to-${colorFinal}`,
        {
            "bg-gradient-to-r": toRight,
            "bg-gradient-to-l": !toRight,
        },
    );

    return (
        <div className={degradeClasses} />
    );
};

export default DegradeBase; 