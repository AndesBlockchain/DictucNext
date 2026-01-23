import PaginaInterior from "@/components/PaginaInterior";
import useServiciosByTipoDeServicio from "@/hooks/use-servicios-by-tipo-de-servicio";
import Servicios from "@/components/Servicios";
import useTipoDeServicio from "@/hooks/use-tipo-de-servicios";
import useSectoresPais from "@/hooks/use-sectores-pais";
import useTipoDeServicioBySlug from "@/hooks/use-tipo-de-servicio-by-slug";

export default async function HomeServicios({ params })
{
  const {slug} = await params;
  const tipoServicio = await useTipoDeServicioBySlug(slug); 
  const tiposDeServicio = await useTipoDeServicio();
  const sectoresPais = await useSectoresPais();
  const servicios = await useServiciosByTipoDeServicio(slug);

  console.log("tipoServicio",tipoServicio)
  return (
    <>
      <PaginaInterior
        banner={tipoServicio.BannerBuscadorServicios}
        titulo={tipoServicio.nombre}
        breadcrum={[{ label: "Home", link: "/" }, { label: tipoServicio.nombre, link: "/" + slug }]}>
        
        <Servicios tipos_de_servicio={tiposDeServicio} sectores_pais={sectoresPais} 
        sectores_pais_visibles={true} tipos_de_servicio_visibles={false}
          servicios={servicios} slug={slug} />

    </PaginaInterior>
    </>
  );
}