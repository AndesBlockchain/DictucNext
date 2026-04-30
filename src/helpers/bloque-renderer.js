import React from "react";
import BloqueTexto from "../components/bloquesPaginas/BloqueTexto";
import BloqueGaleria from "../components/bloquesPaginas/BloqueGaleria";
import BloqueNoticias from "../components/bloquesPaginas/BloqueNoticias";
import BloqueTarjetas from "../components/bloquesPaginas/BloqueTarjetas";
import BloqueEfemerides from "../components/bloquesPaginas/BloqueEfemerides";
import BloquePersonas from "../components/bloquesPaginas/BloquePersonas";
import BloqueDocumentos from "../components/bloquesPaginas/BloqueDocumentos";
import BloqueHero from "../components/bloquesPaginas/BloqueHero";
import BloqueTabs from "../components/bloquesPaginas/BloqueTabs";
import BloqueTiposServicio from "../components/bloquesPaginas/bloqueTiposDeServicio";
import BloqueAcordeon from "../components/bloquesPaginas/BloqueAcordeon";
import BloqueSectoresPais from "../components/bloquesPaginas/BloqueSectoresPais";
import BloqueTablaBuscable from "../components/bloquesPaginas/BloqueTablaBuscable";
import BloqueMapa from "../components/bloquesPaginas/BloqueMapa";
import BloqueTablaPersonas from "../components/bloquesPaginas/BloqueTablaPersonas";
import BloqueContacto from "../components/bloquesPaginas/BloqueContacto";
import BloqueEstadoTicket from "../components/bloquesPaginas/BloqueEstadoTicket";
import BloqueVerificarInforme from "../components/bloquesPaginas/BloqueVerificarInforme";
import BloqueCanalDenuncia from "../components/bloquesPaginas/BloqueCanalDenuncia";
import BloqueNoticiasHistoricas from "../components/bloquesPaginas/BloqueNoticiasHistoricas";
import BloqueInstagram from "../components/bloquesPaginas/BloqueInstagram";

export const renderBloque = (bloque) => {

  switch (bloque.__component) {
    
    case "bloques.bloque-tabs":
    case "STRAPI__COMPONENT_BLOQUES_BLOQUE_TABS":
      //selector para este bloque especifico
      if(bloque.MostrarAcordeon==true) {
        return <BloqueAcordeon datosBloque={bloque} />
      } else {
        return <BloqueTabs datosBloque={bloque} />
      }

    case "bloques.bloque-texto":
    case "STRAPI__COMPONENT_BLOQUES_BLOQUE_TEXTO":
      return <BloqueTexto datosBloque={bloque} />;
      
    case "bloques.bloque-hero":
    case "STRAPI__COMPONENT_BLOQUES_BLOQUE_HERO":
      return <BloqueHero datosBloque={bloque} />;

    case "bloques.bloque-galeria":
    case "STRAPI__COMPONENT_BLOQUES_BLOQUE_GALERIA":
      return <BloqueGaleria datosBloque={bloque} />;
      
    case "bloques.bloque-noticias":
    case "STRAPI__COMPONENT_BLOQUES_BLOQUE_NOTICIAS":
      return <BloqueNoticias datosBloque={bloque} />;
      
    case "bloques.bloque-tarjetas":
    case "STRAPI__COMPONENT_BLOQUES_BLOQUE_TARJETAS":
      return <BloqueTarjetas datosBloque={bloque} />;
      
    case "bloques.bloque-efemerides":
    case "STRAPI__COMPONENT_BLOQUES_BLOQUE_EFEMERIDES":
      return <BloqueEfemerides datosBloque={bloque} />;

    case "bloques.bloque-personas":
    case "STRAPI__COMPONENT_BLOQUES_BLOQUE_PERSONAS":
      return <BloquePersonas datosBloque={bloque} />;

    case "bloques.bloque-documentos":
    case "STRAPI__COMPONENT_BLOQUES_BLOQUE_DOCUMENTOS":
      return <BloqueDocumentos datosBloque={bloque} />;

    case "bloques.bloque-tiposde-servicio":
    case "STRAPI__COMPONENT_BLOQUES_BLOQUE_TIPOSDE_SERVICIO":
      return <BloqueTiposServicio datosBloque={bloque} />;

    case "bloques.bloque-sectores-pais":
    case "STRAPI__COMPONENT_BLOQUES_BLOQUE_SECTORES_PAIS":
      return <BloqueSectoresPais datosBloque={bloque} />;

    case "bloques.bloque-tabla-buscable":
    case "STRAPI__COMPONENT_BLOQUES_BLOQUE_TABLA_BUSCABLE":
      return <BloqueTablaBuscable datosBloque={bloque} />;

    case "bloques.bloque-mapas":
    case "STRAPI__COMPONENT_BLOQUES_BLOQUE_MAPAS":
      return <BloqueMapa datosBloque={bloque} />;

    case "bloques.bloque-tabla-personas":
    case "STRAPI__COMPONENT_BLOQUES_BLOQUE_TABLA_PERSONAS":
      return <BloqueTablaPersonas datosBloque={bloque} />;

    case "bloques.bloque-contacto":
    case "STRAPI__COMPONENT_BLOQUES_BLOQUE_CONTACTO":
      return <BloqueContacto datosBloque={bloque} />;

    case "bloques.bloque-estado-ticket":
    case "STRAPI__COMPONENT_BLOQUES_BLOQUE_ESTADO_TICKET":
      return <BloqueEstadoTicket datosBloque={bloque} />;

    case "bloques.bloque-verificar-informe":
    case "STRAPI__COMPONENT_BLOQUES_BLOQUE_VERIFICAR_INFORME":
      return <BloqueVerificarInforme datosBloque={bloque} />;

    case "bloques.bloque-canal-denuncia":
    case "STRAPI__COMPONENT_BLOQUES_BLOQUE_CANAL_DENUNCIA":
      return <BloqueCanalDenuncia datosBloque={bloque} />;

    case "bloques.bloque-noticias-historicas":
    case "STRAPI__COMPONENT_BLOQUES_BLOQUE_NOTICIAS_HISTORICAS":
      return <BloqueNoticiasHistoricas datosBloque={bloque} />;

    case "bloques.bloque-instagram":
    case "STRAPI__COMPONENT_BLOQUES_BLOQUE_INSTAGRAM":
      return <BloqueInstagram datosBloque={bloque} />;

    default:
      return (
        <div key={bloque.id} className="bg-yellow-100 p-4 rounded-lg border border-yellow-300">
          <p className="text-yellow-800">
            <strong>Tipo de bloque no reconocido:</strong> {bloque.strapi_component}
          </p>
          <pre className="text-xs mt-2">{JSON.stringify(bloque, null, 2)}</pre>
        </div>
      );
  }
};