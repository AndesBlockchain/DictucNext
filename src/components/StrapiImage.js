import React from "react";
import Image from "next/image";

const getImageUrl = (url) => {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  const baseUrl = process.env.STRAPI_API_URL || process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
  return `${baseUrl}${url}`;
};

/**
 * Selecciona el formato de imagen Strapi más apropiado según el ancho máximo de visualización.
 * Evita descargar imágenes más grandes de lo necesario.
 */
const elegirFormato = (imgData, maxWidth) => {
  if (!maxWidth || !imgData?.formats) return imgData;

  const formatos = [
    { key: 'thumbnail', ancho: 245 },
    { key: 'small', ancho: 500 },
    { key: 'medium', ancho: 750 },
    { key: 'large', ancho: 1000 },
  ];

  for (const fmt of formatos) {
    if (maxWidth <= fmt.ancho && imgData.formats[fmt.key]) {
      return imgData.formats[fmt.key];
    }
  }

  return imgData;
};

/**
 * Componente simplificado para renderizar imágenes de Strapi.
 * Prioriza:
 * 1. Imagen de Strapi (si existe)
 * 2. Fallback (si existe)
 *
 * @param {number} maxWidth - Ancho máximo de visualización. Si se pasa, selecciona el formato Strapi más apropiado.
 */
const StrapiImage = ({
  imagen,
  fallback = null,
  alt = "",
  className = "",
  containerClassName = "",
  fill = false,
  priority = false,
  maxWidth = null,
  sizes = "100vw"
}) => {
  const rawImgData = Array.isArray(imagen) ? imagen[0] : imagen;
  const imgData = elegirFormato(rawImgData, maxWidth);
  const imageUrl = getImageUrl(imgData?.url);

  let content = null;

  if (imageUrl) {
    if (fill) {
      content = (
        <Image
          src={imageUrl}
          alt={alt}
          fill
          quality={95}
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
          quality={95}
          className={className}
          priority={priority}
        />
      );
    } else {
      content = (
        <Image
          src={imageUrl}
          alt={alt}
          width={800}
          height={600}
          quality={95}
          className={className}
          priority={priority}
        />
      );
    }
  } else if (fallback) {
    const fallbackSrc = (typeof fallback === 'object' && fallback.src) ? fallback : fallback;

    if (typeof fallbackSrc === 'string') {
      content = (
        <Image
          src={fallbackSrc}
          alt={alt}
          width={800}
          height={600}
          className={className}
          priority={priority}
        />
      );
    } else {
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
