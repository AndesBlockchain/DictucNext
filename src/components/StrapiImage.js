import React from "react";
import Image from "next/image";

const getImageUrl = (url) => {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  const baseUrl = process.env.STRAPI_API_URL || process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
  return `${baseUrl}${url}`;
};

/**
 * Componente simplificado para renderizar imágenes de Strapi.
 * Prioriza:
 * 1. Imagen de Strapi (si existe)
 * 2. Fallback (si existe)
 */
const StrapiImage = ({
  imagen,
  fallback = null,
  alt = "",
  className = "",
  containerClassName = "",
  fill = false,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
}) => {
  const imgData = Array.isArray(imagen) ? imagen[0] : imagen;
  const imageUrl = getImageUrl(imgData?.url);

  // Determinar qué renderizar
  let content = null;

  if (imageUrl) {
    if (fill) {
      content = (
        <Image
          src={imageUrl}
          alt={alt}
          fill
          className={`${className} object-cover`}
          sizes={sizes}
          priority={priority}
        />
      );
    } else if (imgData?.width && imgData?.height) {
      content = (
        <Image
          src={imageUrl}
          alt={alt}
          width={imgData.width}
          height={imgData.height}
          className={className}
          priority={priority}
        />
      );
    } else {
      // Fallback a <img> si no hay dimensiones para next/image y no es fill
      content = <img src={imageUrl} alt={alt} className={className} />;
    }
  } else if (fallback) {
    // Manejo unificado de fallback (ya sea objeto estático o string URL)
    const fallbackSrc = (typeof fallback === 'object' && fallback.src) ? fallback : fallback;

    // Si es objeto de Next.js (import), usamos Image, si es string, tratamos de usar img si no sabemos dimensiones, 
    // pero si fallback es string, Next Image requiere width/height o fill. 
    // Asumiremos que si es string fallback simple usa img tag para evitar errores de Next Image sin dimensiones.
    if (typeof fallbackSrc === 'string') {
      content = <img src={fallbackSrc} alt={alt} className={className} />;
    } else {
      // StaticImageData tiene dimensiones, seguro usar Image
      content = <Image src={fallbackSrc} alt={alt} className={className} priority={priority} />;
    }
  }

  if (!content) return null;

  if (containerClassName || fill) {
    return (
      <div className={`${containerClassName} ${fill ? 'relative w-full h-full' : ''}`}>
        {content}
      </div>
    );
  }

  return content;
};

export default StrapiImage;
