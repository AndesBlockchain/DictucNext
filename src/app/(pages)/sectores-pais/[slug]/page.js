import PaginaInterior from "@/components/PaginaInterior";
import useSectorBySlug from "@/hooks/use-sector-by-slug";
import Servicios from "@/components/Servicios";
import useTipoDeServicio from "@/hooks/use-tipo-de-servicios";
import useSectoresPais from "@/hooks/use-sectores-pais";
import useUnidades from "@/hooks/use-unidades";
import useServicios from "@/hooks/use-servicios";

export default async function HomeServicios({ params })
{
  const {slug} = await params;
  const [sector, tiposDeServicio, sectoresPais, servicios, unidades] = await Promise.all([
    useSectorBySlug(slug),
    useTipoDeServicio(),
    useSectoresPais(),
    useServicios(),
    useUnidades()
  ]);

  return (
    <>
      <PaginaInterior
        banner={sector.banner}
        titulo="Nuestros Servicios"
        breadcrum={[{ label: "Home", link: "/" }, { label: "Nuestros Servicios", link: "/servicios/todos-los-servicios" }, { label: sector.nombre, link: "/" + slug }]}>

        <Servicios tipos_de_servicio={tiposDeServicio} sectores_pais={sectoresPais} unidades={unidades}
        sectores_pais_visibles={true} tipos_de_servicio_visibles={true}
          servicios={servicios} slug={slug} />

    </PaginaInterior>
    </>
  );
}