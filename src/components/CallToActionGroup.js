import React from "react";
import CallToAction from "./CallToAction";

const CallToActionGroup = ({ buttons }) => {

console.log("calltoactiongroup",buttons)

  return (
      <div className="flex justify-center">
      {buttons && buttons.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4 justify-center items-center">
          {buttons.map((cta, ctaIndex) => (
            <CallToAction
              key={ctaIndex}
              url={cta.url}
              texto={cta.texto}
              colorFondo={cta.colorFondo}
              colorTexto={cta.colorTexto}
              ComoAbrir={cta.ComoAbrir}
            />
          ))}
        </div>
      )}
      </div>
  );
};

export default CallToActionGroup;