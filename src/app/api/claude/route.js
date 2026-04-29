import { NextResponse } from "next/server"

const STRAPI_API_URL = process.env.STRAPI_API_URL || "http://127.0.0.1:1337"

export async function POST(request) {
  try {
    const body = await request.json()

    const response = await fetch(`${STRAPI_API_URL}/api/claude`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Error desde Strapi:", errorText)
      return NextResponse.json(
        { error: "Error al consultar el asistente" },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error en /api/claude:", error)
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    )
  }
}
