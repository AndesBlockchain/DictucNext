import { NextResponse } from "next/server"

const DENUNCIA_API_URL = "https://inet.dictuc.cl/intranet/empresa/prevencion_delito/_api/recibir_denuncia.phtml"

export async function POST(request) {
  try {
    const body = await request.json()

    const response = await fetch(DENUNCIA_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Error desde API de denuncias:", errorText)
      return NextResponse.json(
        { error: "Error al enviar la denuncia" },
        { status: response.status }
      )
    }

    const data = await response.json().catch(() => ({ success: true }))
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error en /api/denuncia:", error)
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    )
  }
}
