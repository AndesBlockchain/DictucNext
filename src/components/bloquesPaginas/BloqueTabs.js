"use client"
import React, { useState } from "react";
import Bloque from "./Bloque";
import CallToActionGroup from "../CallToActionGroup";
import StrapiImage from "../StrapiImage";

const BloqueTabs = ({ datosBloque }) => {

  // Ejemplo de datos para las tabs
  const tabsData = datosBloque?.Tabs || [];

  // Estado para controlar qué tab está activo (inicia en 0 para el primer tab)
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Bloque datosBloque={datosBloque.Bloque}>
      <div className="container mx-auto max-w-6xl px-4 pb-8">
        <div className="mb-6 text-sm prose prose-sm max-w-none" dangerouslySetInnerHTML={{__html: datosBloque.texto?.Texto || ""}} />
        <div className="mb-8">
          {/* Tab buttons */}
          <div role="tablist" className="tabs tabs-lifted justify-center">
            {tabsData.map((tab, index) => (
              <button
                key={tab.id}
                role="tab"
                onClick={() => setActiveTab(index)}
                className={`tab ${activeTab === index ? 'tab-active text-azul-dictuc border-b-2 border-azul-dictuc font-semibold' : ''}`}
                aria-label={tab.Titulo}
              >
                {tab.Titulo}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {tabsData.map((tab, index) => (
            <div
              key={tab.id}
              role="tabpanel"
              className={`bg-base-100 border-base-300 rounded-box p-6 ${activeTab === index ? '' : 'hidden'}`}
            >
              <div className="flex flex-col md:flex-row md:flex-nowrap items-center md:items-start gap-2 mb-4">
                <div className="flex flex-col sm:w-2/3 md:w-2/5 items-center pl-8 pr-8">
                  <StrapiImage
                    imagen={tab.Foto}
                    gatsbyImageData={tab.Foto?.localFile?.childImageSharp?.gatsbyImageData}
                    fallback={tab.Foto?.formats?.medium?.url}
                    alt={tab.Titulo || ""}
                    className="rounded-xl align-center"
                  />
                </div>
                <div className="mt-auto mb-auto w-full md:w-3/5 pl-8 text-left text-sm prose prose-sm max-w-none" dangerouslySetInnerHTML={{__html: tab.Texto || ""}} />
              </div>
              <CallToActionGroup buttons={tab.CallToAction}/>
            </div>
          ))}
        </div>
      </div>
    </Bloque>
  );
};

export default BloqueTabs;