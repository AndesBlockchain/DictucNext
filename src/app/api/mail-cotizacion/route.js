import { NextResponse } from "next/server"
import { generarMailCotizacion } from "@/templates/mail-cotizacion"

/**
 * GET: Previsualización del template de email de cotización
 * Uso: /api/mail-cotizacion?ticket=12345
 *
 * POST: Genera el HTML del email con los datos proporcionados
 * Body: { ticketNumber, logoUrl?, trackingUrl? }
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const ticket = searchParams.get("ticket") || "12345"

  const html = generarMailCotizacion({ ticketNumber: ticket })

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" }
  })
}

export async function POST(request) {
  try {
    const body = await request.json()
    const html = generarMailCotizacion({
      ticketNumber: body.ticketNumber || "XXXXX",
      logoUrl: body.logoUrl,
      trackingUrl: body.trackingUrl
    })

    return NextResponse.json({ html })
  } catch (error) {
    return NextResponse.json(
      { error: "Error al generar el template" },
      { status: 500 }
    )
  }
}
