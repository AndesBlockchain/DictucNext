import React from "react";

const Badge = ({ texto, color = "blue" }) => {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-800",
    green: "bg-green-100 text-green-800",
    red: "bg-red-100 text-red-800",
    yellow: "bg-yellow-100 text-yellow-800",
    gray: "bg-gray-100 text-gray-800",
    // Puedes agregar más colores si lo necesitas
  };
  return (
    <span className={`inline-block ${colorClasses[color] || colorClasses.blue} text-xs font-semibold mr-2 px-2.5 py-0.5 border rounded-full`}>
      {texto}
    </span>
  );
};

export default Badge; 