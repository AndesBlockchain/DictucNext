import PaginaInterior from "@/components/PaginaInterior";
import Servicios from "@/components/Servicios";
import useTipoDeServicio from "@/hooks/use-tipo-de-servicios";
import useSectoresPais from "@/hooks/use-sectores-pais";
import useUnidades from "@/hooks/use-unidades";
import useServicios from "@/hooks/use-servicios";
const BannerServicios = "/images/banner_servicios.jpg";

export default async function EjecutorServicios({ params }) {
  const { slug } = await params;
  const [tiposDeServicio, sectoresPais, servicios, unidades] = await Promise.all([
    useTipoDeServicio(),
    useSectoresPais(),
    useServicios(),
    useUnidades()
  ]);

  const unidad = unidades.data?.find(u => u.slug === slug);

  if (!unidad) {
    return <div className="text-center py-16 text-gray-500">Ejecutor no encontrado</div>;
  }

  return (
    <PaginaInterior
      fallback={BannerServicios}
      titulo="Nuestros Servicios"
      breadcrum={[{ label: "Home", link: "/" }, { label: "Nuestros Servicios", link: "/servicios/todos-los-servicios" }, { label: unidad.nombre }]}>

      <Servicios tipos_de_servicio={tiposDeServicio} sectores_pais={sectoresPais} unidades={unidades}
        sectores_pais_visibles={true} tipos_de_servicio_visibles={true}
        servicios={servicios} ejecutorInicial={unidad.nombre} />

    </PaginaInterior>
  );
}
