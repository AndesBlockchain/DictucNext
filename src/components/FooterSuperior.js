import StrapiImage from "@/components/StrapiImage";
import useMenuFooterSuperior from "../hooks/use-menu-footer-superior";

const FooterSuperior = async () => {

  const item = await useMenuFooterSuperior();

  if (!item) return null;

  const logoIngUC = item.LogotipoIngUC;
  const certificaciones = [item.Certificacion1, item.Certificacion2, item.Certificacion3, item.Certificacion4, item.Certificacion5, item.Certificacion6]
    .filter((cert) => Boolean(cert?.Logotipo?.url));
  const entidad = item.EntidadRelacionada?.Logotipo?.url ? item.EntidadRelacionada : null;

  return (
    <div id="footer-superior" className="m-auto bg-gray-200">
      <div className="grid grid-cols-12 pl-8 pr-8 pt-4 pb-2 w-full gap-6 max-w-6xl mx-auto">
      {/* Logo Escuela de Ingeniería UC */}
      <div className="lg:col-span-2 md:col-span-4 col-span-12 content-center">
        {logoIngUC?.url && (
          <div>
            <a href="https://www.ing.uc.cl/" target="_blank" rel="noopener noreferrer">
              <StrapiImage imagen={logoIngUC} alt="Logo Ingenieria UC" className="max-h-[96px] w-auto" />
            </a>
          </div>
        )}
      </div>
      {/* Certificaciones */}
      <div className="col-span-12 md:col-span-6 lg:col-span-6 lg:col-start-4">
        <div className="text-azul-dictuc font-bold mb-3 self-start" style={{ marginLeft: '4px' }}>Certificaciones</div>
        <div className="flex flex-row gap-4 w-full">
          {certificaciones.map((cert, index) => (
            <div key={cert.id ?? index} className="w-16 h-16 flex items-center justify-center">
              <a
                href={cert.Link}
                target={cert.ComoAbrir === "Nueva Ventana" ? "_blank" : undefined}
                rel={cert.ComoAbrir === "Nueva Ventana" ? "noopener noreferrer" : undefined}
              >
                <StrapiImage imagen={cert.Logotipo} alt={cert.Nombre || ""} className="h-16 w-auto mx-auto" />
              </a>
            </div>
          ))}
        </div>
      </div>
      {/* Empresas Relacionadas */}
      {entidad && (
        <div className="col-span-12 md:col-span-2">
          <div className="text-azul-dictuc font-bold mb-3 leading-none">Entidades Relacionadas</div>
          <div>
            <a
              href={entidad.Link}
              target={entidad.ComoAbrir === "Nueva Ventana" ? "_blank" : undefined}
              rel={entidad.ComoAbrir === "Nueva Ventana" ? "noopener noreferrer" : undefined}
            >
              <StrapiImage imagen={entidad.Logotipo} alt={entidad.Nombre || "Logo entidad relacionada"} className="h-12 w-auto" />
            </a>
          </div>
        </div>
      )}
    </div>
    </div>
  )
}

export default FooterSuperior
