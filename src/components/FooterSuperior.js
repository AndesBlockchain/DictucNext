import React from "react";
import useMenuFooterSuperior from "../hooks/use-menu-footer-superior";

const FooterSuperior = async () => {

  const STRAPI_URL = process.env.STRAPI_API_URL;

  const item = await useMenuFooterSuperior();

  if (!item) return null;

  const logoIngUC = item.LogotipoIngUC;
  const certificaciones = [item.Certificacion1, item.Certificacion2, item.Certificacion3, item.Certificacion4].filter(Boolean);
  const entidad = item.EntidadRelacionada;

  return (
    <div id="footer-superior" className="m-auto  bg-gray-200">
      <div className="grid grid-cols-12 pl-8 pr-8 pt-4 pb-2 w-full gap-6 max-w-6xl mx-auto">
      {/* Logo Escuela de Ingeniería UC */}
      <div className="lg:col-span-3 md:col-span-4 col-span-12 content-center">
        {logoIngUC && (
          <div>
            <a href="https://www.ing.uc.cl/" target="_blank" rel="noopener noreferrer">
              <img src={STRAPI_URL + logoIngUC.url} alt="Logo Ingenieria UC" className="max-w-xs w-full h-auto" />
            </a>
          </div>
        )}
      </div>
      {/* Certificaciones */}
      <div className="col-span-12 md:col-span-6 lg:col-span-4 lg:col-start-6">
        <div className="text-azul-dictuc font-bold mb-3 self-start" style={{ marginLeft: '4px' }}>Certificaciones</div>
        <div className="flex flex-row gap-4 w-full">
          {certificaciones.map((cert, index) => (
            <div key={cert.id ?? index} className="w-16 h-16 flex items-center justify-center">
              <a
                href={cert.Link}
                target={cert.ComoAbrir === "Nueva Ventana" ? "_blank" : "_self"}
                rel={cert.ComoAbrir === "Nueva Ventana" ? "noopener noreferrer" : undefined}
              >
                <img src={STRAPI_URL + cert.Logotipo.url} alt={cert.Nombre || ""} className="h-16 w-auto mx-auto" />
              </a>
            </div>
          ))}
        </div>
      </div>
      {/* Empresas Relacionadas */}
      {entidad && (
        <div className="col-span-12 md:col-span-2">
          <div className="text-azul-dictuc font-bold mb-3">Entidades Relacionadas</div>
          <div>
            <a
              href={entidad.Link}
              target={entidad.ComoAbrir === "Nueva Ventana" ? "_blank" : "_self"}
              rel={entidad.ComoAbrir === "Nueva Ventana" ? "noopener noreferrer" : undefined}
            >
              <img src={STRAPI_URL + entidad.Logotipo.url} className="h-12" alt={entidad.Nombre || "Logo entidad relacionada"} />
            </a>
          </div>
        </div>
      )}
    </div>
    </div>
  )
}

export default FooterSuperior
