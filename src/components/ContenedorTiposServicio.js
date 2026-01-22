import React from "react"
import useTipoDeServicio from "@/hooks/use-tipo-de-servicios";


const ContenedorTiposServicio = async ({ useIcono = false }) => {

  const res = await useTipoDeServicio();
  const STRAPI_URL = process.env.STRAPI_API_URL;
  console.log("ENV strapi", STRAPI_URL)
  // Map Strapi response
  const nodes = res.data?.map(item => ({
    id: item.id,
    ...item.attributes,
    // Helper to get nested image url safely
    Icono: item.Icono?.data?.attributes,
    fotoPortada: item.fotoPortada?.data?.attributes
  })) || [];
  
  return (
    <div id="items-servicios" className="grid gap-6 mt-8 pl-2 pr-2">
      <div className="grid grid-cols-3 lg:grid-cols-5 gap-6 justify-center">
        {res.data.map((item, index) =>
          <a key={item.slug || index} href={"/tipos-de-servicio/" + item.slug} className="flex flex-col justify-center lg:w-[215px] lg:h-[180px] group">
            {/* Use StrapiImage if possible, or construct URL. Current code constructs URL. */}
            <img
              src={STRAPI_URL + (useIcono ? item.Icono?.url : item.fotoPortada?.url)}
              alt={item.nombre}
              className="rounded-xl object-cover shadow-md w-full h-full"
            />
            <div className="w-full bg-gray-700 rounded-b-xl -mt-[40px] py-2 text-center relative z-10">
              <span className="text-white lg:text-xs xl:text-xs text-xs font-bold">{item.nombre}</span>
            </div>
          </a>
        )}
      </div>
    </div>
  )
}

export default ContenedorTiposServicio