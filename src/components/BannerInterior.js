import React from "react";
import StrapiImage from "./StrapiImage";

const BannerInterior = ({ banner, gatsbyImageData, fallback, alt = "Banner", titulo = "", titulo_visible = true, color_titulo = "azul-dictuc", icono_secundario = "" }) => {

  return (
    <div className="w-full pt-2 mb-6 relative">
      <div className="relative max-h-[250px] overflow-hidden">
        {titulo_visible && (
          <div className={"text-sm xl:text-2xl min-w-1/4 z-10 opacity-85 text-white font-semibold pl-10 pr-10 px-6 py-3 absolute bottom-12 left-0 bg-" + color_titulo}>
            {titulo}
          </div>
        )}
        <StrapiImage
          imagen={banner}
          gatsbyImageData={gatsbyImageData}
          fallback={fallback}
          alt={alt}
          className="w-full h-auto object-contain"
        />
      </div>
      {icono_secundario && (
        <div className="absolute -bottom-5 right-0 z-10 bg-gris-dictuc shadow-md rounded-tl-xl pl-11 pr-11 py-4">
          <img src={process.env.STRAPI_API_URL + icono_secundario} className="max-w-14" alt="Icono secundario" />
        </div>
      )}
    </div>

  );
};

export default BannerInterior;
