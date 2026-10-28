import { NextResponse } from "next/server"

const STRAPI_API_URL = process.env.STRAPI_API_URL || "https://backendweb.dictuc.cl"

export async function POST(request) {
  try {
    const { cod_val } = await request.json()

    if (!cod_val) {
      return NextResponse.json({ error: "Código de verificación requerido" }, { status: 400 })
    }

    const response = await fetch(`${STRAPI_API_URL}/api/verificar-informe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ cod_val }),
    })

    const data = await response.json().catch(() => null)
    const url = data?.data?.url

    if (!response.ok || !url) {
      return NextResponse.json({ error: "Informe no encontrado" }, { status: 404 })
    }

    return NextResponse.json({ url })
  } catch (error) {
    console.error("Error en /api/verificar-informe:", error)
    return NextResponse.json({ error: "Informe no encontrado" }, { status: 404 })
  }
}
