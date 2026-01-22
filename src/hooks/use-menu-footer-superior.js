const useMenuFooterSuperior = async() => {
  const baseUrl = process.env.STRAPI_API_URL;

  const res = await fetch(baseUrl + "/api/menu-footer-superiors?populate=all");

  if (!res.ok) throw new Error("Failed to fetch menu superior");

  const data = await res.json();
  return data.data;
}

export default useMenuFooterSuperior;