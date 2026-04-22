import { NextResponse } from "next/server"

const TICKET_API_URL = "https://inet.dictuc.cl/intranet/dictuc/fyc/sistema_comercial_2/ticket_api.phtml"
const TICKET_API_TOKEN = process.env.TICKET_API_TOKEN

export async function POST(request) {
  try {
    const body = await request.json()

    const response = await fetch(TICKET_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": TICKET_API_TOKEN,
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Error desde API de tickets:", errorText)
      return NextResponse.json(
        { error: "Error al consultar el estado del ticket" },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error en /api/estado-ticket:", error)
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    )
  }
}
