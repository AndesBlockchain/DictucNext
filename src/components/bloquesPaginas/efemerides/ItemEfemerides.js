import React from "react";

const ItemEfemerides =({agno, evento, isFirst=false, isLast=false})=>{

    return (
        <li>
        {!isFirst && <hr className="bg-azul-dictuc border-0 dark:bg-gris-dictuc h-full" />}
        <div className="timeline-start text-md pt-4 pb-4">{agno}</div>
        <div className="timeline-middle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            className="h-5 w-5"
          >
            <circle
              cx="10"
              cy="10"
              r="8"
              className="fill-azul-dictuc"
            />
          </svg>
        </div>
        <div className="timeline-end text-md pt-4 pb-4 text-left">{evento}</div>
        {!isLast && <hr className="h-128 bg-azul-dictuc border-0 dark:bg-gris-dictuc" />}
        </li>
    )
}

export default ItemEfemerides;
