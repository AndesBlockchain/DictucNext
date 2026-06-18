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
  sizes = "100vw",
  unoptimized = false,
  width = null,
  height = null,
  maxWidth = null,
  blurDataURL = null
}) => {
  const imgData = Array.isArray(imagen) ? imagen[0] : imagen;
  const imageUrl = getImageUrl(imgData?.url);

  let content = null;

  if (imageUrl) {
    const blurProps = blurDataURL ? { placeholder: "blur", blurDataURL } : {};

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
          unoptimized={unoptimized}
          {...blurProps}
        />
      );
    } else if (width !== null && height !== null) {
      content = (
        <Image
          src={imageUrl}
          alt={alt}
          width={width}
          height={height}
          quality={100}
          className={className}
          priority={priority}
          unoptimized={unoptimized}
          {...blurProps}
        />
      );
    } else if (imgData?.width && imgData?.height) {
      const MAX_WIDTH = maxWidth ?? 3000;
      let imgWidth = imgData.width;
      let imgHeight = imgData.height;
      if (imgWidth > MAX_WIDTH) {
        imgHeight = Math.round(imgHeight * (MAX_WIDTH / imgWidth));
        imgWidth = MAX_WIDTH;
      }
      content = (
        <Image
          src={imageUrl}
          alt={alt}
          width={imgWidth}
          height={imgHeight}
          quality={100}
          className={className}
          priority={priority}
          unoptimized={unoptimized}
          {...blurProps}
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
          unoptimized={unoptimized}
          {...blurProps}
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
          unoptimized={unoptimized}
        />
      );
    } else {
      content = <Image src={fallbackSrc} alt={alt} quality={100} className={className} priority={priority} unoptimized={unoptimized} />;
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
