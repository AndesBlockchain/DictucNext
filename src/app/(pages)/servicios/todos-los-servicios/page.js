import PaginaInterior from "@/components/PaginaInterior";
import Servicios from "@/components/Servicios";
import useTipoDeServicio from "@/hooks/use-tipo-de-servicios";
import useSectoresPais from "@/hooks/use-sectores-pais";
import useServicios from "@/hooks/use-servicios";
import useUnidades from "@/hooks/use-unidades";
const BannerServicios = "/images/banner_servicios.jpg";

export default async function TodosLosServicios({ searchParams })
{
  const { ejecutor } = await searchParams;
  const [tiposDeServicio, sectoresPais, servicios, unidades] = await Promise.all([
    useTipoDeServicio(),
    useSectoresPais(),
    useServicios(),
    useUnidades()
  ]);

  // Buscar el nombre de la unidad que corresponde al slug del param GET
  const ejecutorInicial = ejecutor
    ? unidades.data?.find(u => u.slug === ejecutor)?.nombre || null
    : null;

  return (
    <>
      <PaginaInterior
        fallback={BannerServicios}
        titulo="Nuestros Servicios"
        breadcrum={[{ label: "Home", link: "/" }, { label: "Nuestros Servicios", link: "/todos-los-servicios" }]}>

        <Servicios tipos_de_servicio={tiposDeServicio} sectores_pais={sectoresPais} unidades={unidades}
        sectores_pais_visibles={true} tipos_de_servicio_visibles={true}
          servicios={servicios} ejecutorInicial={ejecutorInicial}/>

    </PaginaInterior>
    </>
  );
}