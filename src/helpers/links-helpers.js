
export function getFullUrl(link,siteUrl) {
  if (link.startsWith('/')) {
    return `${siteUrl}${link}`
  }
  return link
}

export function fullLink(link) {

}