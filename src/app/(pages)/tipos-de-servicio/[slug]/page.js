import PaginaInterior from "@/components/PaginaInterior";
import Servicios from "@/components/Servicios";
import useTipoDeServicio from "@/hooks/use-tipo-de-servicios";
import useSectoresPais from "@/hooks/use-sectores-pais";
import useTipoDeServicioBySlug from "@/hooks/use-tipo-de-servicio-by-slug";
import useUnidades from "@/hooks/use-unidades";
import useServicios from "@/hooks/use-servicios";

export default async function HomeServicios({ params })
{
  const {slug} = await params;
  const tipoServicio = await useTipoDeServicioBySlug(slug);

  if (!tipoServicio) {
    return <div className="text-center py-16 text-gray-500">Tipo de servicio no encontrado</div>;
  }

  const [tiposDeServicio, sectoresPais, servicios, unidades] = await Promise.all([
    useTipoDeServicio(),
    useSectoresPais(),
    useServicios(),
    useUnidades()
  ]);

  return (
    <PaginaInterior
      banner={tipoServicio.BannerBuscadorServicios}
      titulo="Nuestros Servicios"
      breadcrum={[{ label: "Home", link: "/" }, { label: "Nuestro Servicios", link: "/" + slug }]}>

      <Servicios tipos_de_servicio={tiposDeServicio} sectores_pais={sectoresPais} unidades={unidades}
        sectores_pais_visibles={true} tipos_de_servicio_visibles={true}
        servicios={servicios} tipoServicioInicial={slug} />

    </PaginaInterior>
  );
}