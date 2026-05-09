/**
 * Invierte <span style="..."><strong>texto</strong></span>
 * a <strong><span style="...">texto</span></strong>
 * para que el style inline del span no sea sobreescrito por reglas globales de strong.
 */
export const invertirSpanStrong = (html) => {
  if (!html) return html;
  return html.replace(
    /<span([^>]*style="[^"]*"[^>]*)>\s*<strong>([\s\S]*?)<\/strong>\s*<\/span>/gi,
    '<strong><span$1>$2</span></strong>'
  );
};
