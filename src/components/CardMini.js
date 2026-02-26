import React from "react";

export default function CardMini({ titulo, link }) {
  return (
    <div>
        <h2>{titulo}</h2>
        <a href={link}>Ver detalle</a>
    </div>
  );    
}