import React from "react";
import StrapiImage from "./StrapiImage";

const BannerInterior = ({ banner, gatsbyImageData, fallback, alt = "Banner", titulo = "", titulo_visible = true, color_titulo = "azul-dictuc", icono_secundario = "" }) => {

  return (
    <div className="w-full pt-2 mb-2 relative max-h-[250px] overflow-hidden">
      {titulo_visible && (
        <div className={"text-sm xl:text-2xl min-w-1/4 z-10 opacity-85 text-white pl-10 pr-10 px-6 py-3 absolute bottom-12 left-0 bg-" + color_titulo}>
          {titulo}
        </div>
      )}

      {icono_secundario && (
        <div id="texto-carrusel-2" className={"font-semibold absolute text-white text-lg -bottom-6 right-0 z-5 bg-white opacity-90 text-opacity-90 px-6 py-6 rounded-l-full"}>
      <img src={process.env.STRAPI_API_URL + icono_secundario} className="max-w-12 pb-2" alt="Icono secundario" />
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

  );
};

export default BannerInterior;
