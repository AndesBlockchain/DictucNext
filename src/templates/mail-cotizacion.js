/**
 * Template de email HTML para confirmación de cotización.
 * Genera HTML inline-styled compatible con clientes de email (Gmail, Outlook, Apple Mail).
 *
 * @param {Object} params
 * @param {string} params.ticketNumber - Número de ticket (ej: "66172")
 * @param {string} params.logoUrl - URL pública del logo de Dictuc
 * @param {string} params.trackingUrl - URL para seguimiento del ticket
 * @returns {string} HTML del email
 */
export function generarMailCotizacion({
  ticketNumber = "XXXXX",
  logoUrl = "https://backend-dictuc.andesblockchain.com/uploads/logo_dictuc_interior.png",
  trackingUrl = "https://www.dictuc.cl/estado-ticket"
}) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Recibimos su solicitud de cotización - Dictuc</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f4f4; font-family: Arial, Helvetica, sans-serif;">

<!-- Preheader (hidden) -->
<div style="display:none; max-height:0; overflow:hidden; mso-hide:all;">
  Hemos recibido su solicitud de cotización. Le responderemos antes de 72 hrs.
</div>

<!-- Outer wrapper -->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f4f4;">
  <tr>
    <td align="center" style="padding:24px 12px;">

      <!-- Email container -->
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px; max-width:600px; background-color:#ffffff;">

        <!-- Header: logo + ticket badge -->
        <tr>
          <td style="padding:36px 0 0 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <!-- Logo -->
                <td align="left" valign="middle" style="padding:0 24px 0 36px;">
                  <a href="https://www.dictuc.cl" style="text-decoration:none;">
                    <img src="${logoUrl}" alt="Dictuc" width="160" style="display:block; border:0; outline:none; text-decoration:none; height:auto; max-width:160px;">
                  </a>
                </td>
                <!-- Ticket badge -->
                <td align="right" valign="middle" width="150" style="background-color:#5aa0e8; padding:18px 24px; font-family: Arial, Helvetica, sans-serif; font-size:16px; font-weight:bold; color:#ffffff; white-space:nowrap;">
                  Ticket n° ${ticketNumber}
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Title -->
        <tr>
          <td align="center" style="padding:64px 36px 56px 36px; font-family: Arial, Helvetica, sans-serif; font-size:24px; font-weight:bold; color:#3a3a3a; letter-spacing:0.5px;">
            RECIBIMOS SU SOLICITUD DE COTIZACIÓN
          </td>
        </tr>

        <!-- Body copy -->
        <tr>
          <td style="padding:0 48px; font-family: Arial, Helvetica, sans-serif; font-size:16px; line-height:1.5; color:#3a3a3a;">
            <p style="margin:0 0 20px 0; font-weight:bold;">Estimado cliente:</p>

            <p style="margin:0 0 16px 0;">
              Junto con saludar y agradecer su contacto, confirmamos la recepción de su requerimiento <strong style="color:#3a8de0;">N° ${ticketNumber},</strong> el cual será analizado y contestado antes de 72 hrs.
            </p>

            <p style="margin:0 0 24px 0;">
              Podrá realizar el seguimiento de éste en nuestro sitio web, sección
              <a href="${trackingUrl}" style="color:#3a8de0; text-decoration:none; font-weight:bold;">Estado de Ticket.</a>
            </p>

            <p style="margin:0 0 56px 0; font-weight:bold;">Dictuc S.A.</p>
          </td>
        </tr>

        <!-- Note -->
        <tr>
          <td style="padding:0 48px 64px 48px; font-family: Arial, Helvetica, sans-serif; font-size:13px; line-height:1.5; color:#7a7a7a; font-style:italic;">
            Nota: Por favor no responda este mensaje por ser generado de forma automática y enviado desde una dirección de correo para notificaciones que no contempla la recepción de mensajes.
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background-color:#4a4a4a; padding:28px 36px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <!-- Social -->
                <td align="left" valign="top" width="50%" style="font-family: Arial, Helvetica, sans-serif; font-size:14px; color:#ffffff;">
                  <div style="margin-bottom:14px; font-weight:bold;">Síguenos en</div>
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="padding-right:14px;">
                        <a href="https://www.instagram.com/dictuc.ingenieriaquetransforma/" style="text-decoration:none; color:#ffffff;">
                          <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram" width="20" height="20" style="display:block; border:0;">
                        </a>
                      </td>
                      <td style="padding-right:14px;">
                        <a href="https://x.com/Dictuc" style="text-decoration:none; color:#ffffff;">
                          <img src="https://cdn-icons-png.flaticon.com/512/5968/5968958.png" alt="X" width="18" height="18" style="display:block; border:0;">
                        </a>
                      </td>
                      <td>
                        <a href="https://www.linkedin.com/company/dictuc-sa/" style="text-decoration:none; color:#ffffff;">
                          <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" width="20" height="20" style="display:block; border:0;">
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
                <!-- Contact -->
                <td align="right" valign="bottom" width="50%" style="font-family: Arial, Helvetica, sans-serif; font-size:13px; color:#ffffff; line-height:1.7;">
                  <a href="https://www.dictuc.cl" style="color:#ffffff; text-decoration:none; font-weight:bold;">www.dictuc.cl</a><br>
                  Fono: +56 9 5504 4886
                </td>
              </tr>
            </table>
          </td>
        </tr>

      </table>
      <!-- /Email container -->

    </td>
  </tr>
</table>

</body>
</html>`;
}
