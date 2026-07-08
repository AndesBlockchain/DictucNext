import sharp from 'sharp';

const cache = new Map();

export async function getBlurDataURL(imagen) {
  const imgData = Array.isArray(imagen) ? imagen[0] : imagen;
  const thumbnailUrl = imgData?.formats?.thumbnail?.url || imgData?.formats?.small?.url;
  if (!thumbnailUrl) return null;

  const baseUrl = process.env.STRAPI_API_URL || 'http://localhost:1337';
  const fullUrl = thumbnailUrl.startsWith('http') ? thumbnailUrl : `${baseUrl}${thumbnailUrl}`;

  if (cache.has(fullUrl)) return cache.get(fullUrl);

  try {
    const res = await fetch(fullUrl);
    if (!res.ok) return null;

    const buffer = Buffer.from(await res.arrayBuffer());
    const blurBuffer = await sharp(buffer)
      .resize(10, 10, { fit: 'inside' })
      .blur()
      .jpeg({ quality: 30 })
      .toBuffer();

    const dataUrl = `data:image/jpeg;base64,${blurBuffer.toString('base64')}`;

    cache.set(fullUrl, dataUrl);
    return dataUrl;
  } catch {
    return null;
  }
}
