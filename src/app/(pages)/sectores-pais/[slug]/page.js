import PaginaInterior from "@/components/PaginaInterior";
import useSectorBySlug from "@/hooks/use-sector-by-slug";
import useServiciosBySector from "@/hooks/use-servicios-by-sector";
import Servicios from "@/components/Servicios";
import useTipoDeServicio from "@/hooks/use-tipo-de-servicios";
import useSectoresPais from "@/hooks/use-sectores-pais";

export default async function HomeServicios({ params })
{
  const {slug} = await params;
  const sector = await useSectorBySlug(slug); 
  const tiposDeServicio = await useTipoDeServicio();
  const sectoresPais = await useSectoresPais();
  const servicios = await useServiciosBySector(slug);


  return (
    <>
      <PaginaInterior
        banner={sector.banner}
        titulo={sector.nombre}
        breadcrum={[{ label: "Home", link: "/" }, { label: sector.nombre, link: "/" + slug }]}>
        
        <Servicios tipos_de_servicio={tiposDeServicio} sectores_pais={sectoresPais} 
        sectores_pais_visibles={false} tipos_de_servicio_visibles={true}
          servicios={servicios} slug={slug} />

    </PaginaInterior>
    </>
  );
}