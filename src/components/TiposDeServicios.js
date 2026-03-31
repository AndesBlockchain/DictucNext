import React from "react"
import FranjaAzul from "./FranjaAzul"
import ContenedorTiposServicio from "./ContenedorTiposServicio";

const TiposDeServicios = () => {

  return(
  <div id="tipo_servicios" className="mt-8 mb-8">
    <div className="m-auto max-w-7xl">
      <FranjaAzul />
      <div className="text-center mb-4 mt-4 font-semibold uppercase">
      <span className="text-azul-dictuc">Servicios</span> que ofrecemos
      </div> 
      <div className="text-center text-sm w-full sm:w-2/3 lg:w-1/2 mx-auto">
      <p className="text-sm">En Dictuc ponemos a tu alcance una amplia oferta de servicios de ingeniería.</p>
      <p className="text-sm">Nuestra experiencia nos permite adaptarnos a lo <b>que necesitas, cuando lo necesitas.</b></p><br />
      <p className="text-sm">Aplicamos nuestra experiencia en ingeniería para ofrecer soluciones prácticas y personalizadas
      que responden a los desafíos que enfrenta tu negocio.</p><br />
      <p className="text-azul-dictuc font-bold text-sm">Confía en nuestra experiencia para transformar tus ideas en resultados exitosos.</p>
      </div>
      <ContenedorTiposServicio className="mt-12" useIcono={false}/>
    </div>
  </div>
)}

export default TiposDeServicios 