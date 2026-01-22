import React from "react";
import Bloque from "./Bloque";
import CardServicio from "../CardServicio";

const BloqueAcordeon = ({ datosBloque }) => {
  const STRAPI_URL = process.env.STRAPI_API_URL;
  const tabsData = datosBloque?.Tabs || []

  return (
    <Bloque datosBloque={datosBloque.Bloque}>
      <div className="container mx-auto px-4 py-8">
        {/* Ejemplo 1: Tabs básicas */}
        <div className="mb-8">
          <div>
            {tabsData.map((tab, index) => (
              <React.Fragment key={tab.id}>
                <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                  <input type="radio" name="my-accordion-2" defaultChecked={index === 0} />
                  <div className="collapse-title font-semibold text-azul-dictuc">{tab.Titulo}</div>
                  <div className="collapse-content text-sm">
                    <div className="flex flex-row items-start gap-2 mb-4">
                    <div className="flex flex-item w-2/5 pl-8 pr-8">
                      <img className="rounded-xl" src={STRAPI_URL + tab.Foto.formats.medium.url} />
                    </div>
                    <div className="mt-auto mb-auto w-3/5 pl-8 text-left text-sm" dangerouslySetInnerHTML={{__html: tab.Texto.data.Texto}} />
                  </div>                
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </Bloque>
  );
};

export default BloqueAcordeon;