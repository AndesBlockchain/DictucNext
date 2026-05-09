import React from "react";
import Image from "next/image";

const reescribirWpContent = (url) => {
  if (url?.startsWith('https://www.dictuc.cl/wp-content/')) {
    return url.replace('https://www.dictuc.cl', 'https://wwwdictuc.blob.core.windows.net/fotosnoticiasantiguas');
  }
  return url;
};

const getImageUrl = (url) => {
  if (!url) return null;
  const reescrita = reescribirWpContent(url);
  if (reescrita !== url) return reescrita;
  if (url.startsWith('http')) return url;
  const baseUrl = process.env.STRAPI_API_URL || process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
  return `${baseUrl}${url}`;
};

/**
 * Componente para renderizar imágenes de Strapi.
 * Usa siempre la imagen original de Strapi y la convierte a WebP vía Next.js.
 */
const StrapiImage = ({
  imagen,
  fallback = null,
  alt = "",
  className = "",
  containerClassName = "",
  fill = false,
  priority = false,
  sizes = "100vw"
}) => {
  const imgData = Array.isArray(imagen) ? imagen[0] : imagen;
  const imageUrl = getImageUrl(imgData?.url);

  let content = null;

  if (imageUrl) {
    if (fill) {
      content = (
        <Image
          src={imageUrl}
          alt={alt}
          fill
          quality={100}
          className={`${className} object-cover`}
          sizes={sizes}
          priority={priority}
        />
      );
    } else if (imgData?.width && imgData?.height) {
      const MAX_WIDTH = 3000;
      let width = imgData.width;
      let height = imgData.height;
      if (width > MAX_WIDTH) {
        height = Math.round(height * (MAX_WIDTH / width));
        width = MAX_WIDTH;
      }
      content = (
        <Image
          src={imageUrl}
          alt={alt}
          width={width}
          height={height}
          quality={100}
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
          quality={100}
          className={className}
          priority={priority}
        />
      );
    }
  } else if (fallback) {
    const rawFallback = (typeof fallback === 'object' && fallback.src) ? fallback.src : fallback;
    const fallbackSrc = typeof rawFallback === 'string' ? reescribirWpContent(rawFallback) : rawFallback;

    if (typeof fallbackSrc === 'string') {
      content = (
        <Image
          src={fallbackSrc}
          alt={alt}
          width={800}
          height={600}
          quality={100}
          className={className}
          priority={priority}
        />
      );
    } else {
      content = <Image src={fallbackSrc} alt={alt} quality={100} className={className} priority={priority} />;
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
