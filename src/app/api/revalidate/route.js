import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

const REVALIDATION_SECRET = process.env.REVALIDATION_SECRET;

export async function POST(request) {
  // Validar token de autorización
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (!REVALIDATION_SECRET || token !== REVALIDATION_SECRET) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const path = body.path || "/";

    // Revalidar la ruta específica o todo el sitio
    revalidatePath(path, "layout");

    return NextResponse.json({
      revalidated: true,
      path,
      timestamp: Date.now()
    });
  } catch (error) {
    console.error("Error en /api/revalidate:", error);
    return NextResponse.json(
      { error: "Error al revalidar" },
      { status: 500 }
    );
  }
}
