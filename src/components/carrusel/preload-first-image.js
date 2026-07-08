import ReactDOM from "react-dom";

const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || process.env.STRAPI_API_URL;

/**
 * Emite un <link rel="preload"> para la primera imagen del carrusel,
 * de modo que el navegador la descargue antes de que el JS del client component se hidrate.
 */
export function preloadFirstImage(item) {
  const imgData = Array.isArray(item.imagen) ? item.imagen[0] : item.imagen;
  const url = imgData?.url;
  if (!url) return;

  const fullUrl = url.startsWith("http") ? url : `${baseUrl}${url}`;

  ReactDOM.preload(fullUrl, {
    as: "image",
    fetchPriority: "high",
    imageSizes: "(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1920px",
  });
}
