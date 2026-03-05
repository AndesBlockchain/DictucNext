import React from "react";

export default function CardMini({ titulo, callToAction }) {

  return (
    <div className="border rounded-lg shadow-md p-4 h-full text-left">
      <h2 className="text-lg font-bold">{titulo}</h2>
      {callToAction && callToAction.url && (
        <div className="mt-4 text-sm"><a className="text-azul-dictuc" href={callToAction.url}>Ver detalle →</a></div>
      )}
    </div>
  );
}