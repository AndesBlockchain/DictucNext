import React from "react"
import useTipoDeServicio from "@/hooks/use-tipo-de-servicios";


const ContenedorTiposServicio = async ({ useIcono = false }) => {

  const tiposDeServicio = await useTipoDeServicio();
  const STRAPI_URL = process.env.STRAPI_API_URL;

  // Validar que tiposDeServicio y tiposDeServicio.data existan
  const tiposArray = tiposDeServicio?.data || [];

  if (tiposArray.length === 0) {
    return null; // O mostrar un mensaje de "No hay servicios disponibles"
  }

  return (
    <div id="items-servicios" className="grid gap-6 mt-8 pl-2 pr-2">
      <div className="grid grid-cols-3 lg:grid-cols-5 gap-6 justify-center">
        {tiposArray.map((item) => {
          // Obtener URL de imagen de forma segura
          const iconoUrl = item.Icono.url;
          const fotoPortadaUrl = item.fotoPortada.url;
          const imageUrl = useIcono ? iconoUrl : fotoPortadaUrl;

          return (
            <a
              key={item.slug}
              href={"/tipos-de-servicio/" + item.slug}
              className="flex flex-col justify-center lg:w-[215px] lg:h-[180px] group"
            >
              {imageUrl && (
                <img
                  src={STRAPI_URL + imageUrl}
                  alt={item.nombre}
                  className="rounded-xl object-cover shadow-md w-full h-full"
                />
              )}
              <div className="w-full bg-gray-700 rounded-b-xl -mt-[40px] py-2 text-center relative z-10">
                <span className="text-white lg:text-xs xl:text-xs text-xs font-bold">
                  {item.nombre}
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  )
}

export default ContenedorTiposServicio