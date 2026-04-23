/**
 * Transforma tags <oembed> de CKEditor/Strapi en iframes funcionales.
 * Soporta YouTube (watch y shorts).
 */
export function oembedToIframe(html) {
  if (!html) return html;

  return html.replace(
    /<figure class="media">\s*<oembed url="([^"]+)">\s*<\/oembed>\s*<\/figure>/g,
    (match, url) => {
      const youtubeId = extractYouTubeId(url);
      if (youtubeId) {
        return `<div class="flex justify-center my-4"><iframe width="560" height="315" src="https://www.youtube.com/embed/${youtubeId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="max-width:100%; aspect-ratio:16/9;"></iframe></div>`;
      }
      return match;
    }
  );
}

function extractYouTubeId(url) {
  const patterns = [
    /youtube\.com\/watch\?v=([^&]+)/,
    /youtube\.com\/embed\/([^?&]+)/,
    /youtube\.com\/shorts\/([^?&]+)/,
    /youtu\.be\/([^?&]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return null;
}
