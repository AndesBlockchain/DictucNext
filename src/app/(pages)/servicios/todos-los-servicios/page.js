import PaginaInterior from "@/components/PaginaInterior";
import Servicios from "@/components/Servicios";
import useTipoDeServicio from "@/hooks/use-tipo-de-servicios";
import useSectoresPais from "@/hooks/use-sectores-pais";
import useServicios from "@/hooks/use-servicios";
import useUnidades from "@/hooks/use-unidades";
const BannerServicios = "/images/banner_servicios.jpg";

export default async function TodosLosServicios()
{
  const tiposDeServicio = await useTipoDeServicio();
  const sectoresPais = await useSectoresPais();
  const servicios = await useServicios();
  const unidades = await useUnidades();

  console.log("servicios",servicios.length);
  
  return (
    <>
      <PaginaInterior
        fallback={BannerServicios}
        titulo="Todos los servicios"
        breadcrum={[{ label: "Home", link: "/" }, { label: "Todos los servicios", link: "/todos-los-servicios" }]}>

        <Servicios tipos_de_servicio={tiposDeServicio} sectores_pais={sectoresPais} unidades={unidades}
        sectores_pais_visibles={true} tipos_de_servicio_visibles={true}
          servicios={servicios}/>

    </PaginaInterior>
    </>
  );
}