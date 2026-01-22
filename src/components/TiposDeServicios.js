import React from "react"
import FranjaAzul from "./FranjaAzul"
import ContenedorTiposServicio from "./ContenedorTiposServicio";

const TiposDeServicios = () => {

  return(
  <div id="tipo_servicios" className="mt-8 mb-8">
    <FranjaAzul />
    <div className="text-center mb-4 mt-4 font-semibold uppercase">
    <span className="text-azul-dictuc">Servicios</span> que ofrecemos
    </div> 
    <div className="text-center text-xs w-full sm:w-2/3 lg:w-1/2 mx-auto">
    <p>En Dictuc ponemos a tu alcance una amplia oferta de servicios de ingeniería.</p>
    <p>Nuestra experiencia nos permite adaptarnos a lo <b>que necesitas, cuando lo necesitas.</b></p><br />
    <p>Aplicamos nuestra experiencia en ingeniería para ofrecer soluciones prácticas y personalizadas
    que responden a los desafíos que enfrenta tu negocio.</p><br />
    <p className="text-azul-dictuc font-bold">Confía en nuestra experiencia para transformar tus ideas en resultados exitosos.</p>
    </div>
    <ContenedorTiposServicio useIcono={false}/>
  </div>
)}

export default TiposDeServicios 