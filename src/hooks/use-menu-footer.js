const useMenuFooter = async () => {
  const baseUrl = process.env.STRAPI_API_URL;

  const res = await fetch(baseUrl + "/api/menu-footers?sort=sortOrder:asc&populate=*");

  if (!res.ok) throw new Error("Failed to fetch menu footer");

  const data = await res.json();
  return data.data;
};

export default useMenuFooter;
