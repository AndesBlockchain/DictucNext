import React from "react";
import Bloque from "./Bloque";

const BloqueAcordeon = ({ datosBloque }) => {
  const STRAPI_URL = process.env.STRAPI_API_URL;
  const tabsData = datosBloque?.Tabs || [];
  const acordeonId = `acordeon-${datosBloque?.Bloque?.id || 'default'}`;

  return (
    <Bloque datosBloque={datosBloque.Bloque}>
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8">
          <div>
            {tabsData.map((tab, index) => (
              <React.Fragment key={tab.id}>
                <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                  <input type="radio" name={acordeonId} defaultChecked={index === 0} />
                  <div className="collapse-title font-semibold text-azul-dictuc text-left">{tab.Titulo}</div>
                  <div className="collapse-content text-sm">
                    <div className="flex flex-col md:flex-row items-start gap-2 mb-4">
                      {tab.Foto?.formats?.medium?.url && (
                        <div className="w-full md:w-2/5 px-8">
                          <img className="rounded-xl" src={STRAPI_URL + tab.Foto.formats.medium.url} alt={tab.Titulo} />
                        </div>
                      )}
                      <div className="mt-auto mb-auto flex-1 md:pl-8 text-left text-sm prose prose-sm max-w-none" dangerouslySetInnerHTML={{__html: tab.Texto || ''}} />
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