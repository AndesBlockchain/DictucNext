import React from "react";
import StrapiImage from "./StrapiImage";

const BannerInterior = ({ banner, gatsbyImageData, fallback, alt = "Banner", titulo = "", titulo_visible = true, color_titulo = "azul-dictuc", icono_secundario = "" }) => {

  return (
    <div className="w-full pt-2 mb-6 relative">
      <div className="relative max-h-[250px] overflow-hidden">
        {titulo_visible && (
          <div className={"hidden lg:block text-sm xl:text-2xl min-w-1/6 z-10 opacity-85 text-white font-semibold pl-10 pr-20 px-6 py-3 absolute bottom-12 left-0 bg-" + color_titulo}>
            {titulo}
          </div>
        )}
        <StrapiImage
          imagen={banner}
          fallback={fallback}
          alt={alt}
          maxWidth={1000}
          className="w-full h-auto object-contain"
        />
      </div>
      {titulo_visible && (
        <div className={"lg:hidden text-sm font-semibold text-white px-6 py-3 bg-" + color_titulo}>
          {titulo}
        </div>
      )}
      {icono_secundario && (
        <div className="absolute -bottom-3 right-0 z-10 bg-gris-dictuc shadow-md rounded-tl-xl pl-8 pr-8 xl:pl-12 xl:pr-12 py-2 xl:py-4 hidden lg:block">
          <img src={process.env.STRAPI_API_URL + icono_secundario} className="xl:max-w-14 max-w-12" alt="Icono secundario" />
        </div>
      )}
    </div>

  );
};

export default BannerInterior;
