import React from "react";

export default function CardSmall({ titulo, link }) {
  return (
    <div className="border rounded-lg shadow-md p-4">
        <h2>{titulo}</h2>
        <a href={link}>Ver detalle</a>
    </div>
  );    
}