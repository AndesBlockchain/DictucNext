export async function POST(request) {
  const body = await request.json();
  const res = await fetch(`${process.env.STRAPI_API_URL}/api/estado-cotizacion`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  const data = await res.json();
  return Response.json(data, { status: res.status });
}
