import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request) {
  try {
    const apiKey = process.env.RESEND_API_KEY || process.env.NEXT_PUBLIC_RESEND_API_KEY;
    if (!apiKey) {
      console.error("[Waitlist API] RESEND_API_KEY is not configured in .env");
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const body = await request.json();
    const { email, agents = [], devices = [], source = "survey" } = body;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Format email tidak valid." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const notificationRecipient = process.env.NOTIFICATION_EMAIL || "delivered@resend.dev";
    const fromSender = process.env.RESEND_FROM_EMAIL || "Vibetification <onboarding@resend.dev>";

    const agentsList = agents.length > 0 ? agents : ["Tidak ada data"];
    const devicesList = devices.length > 0 ? devices : ["Tidak ada data"];
    const submissionTime = new Date().toLocaleString("id-ID", {
      timeZone: "Asia/Jakarta",
      dateStyle: "full",
      timeStyle: "long",
    });

    // Modern HTML email template for Gmail
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Lead Vibetification</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f6f5f1; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1c1c1f;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f6f5f1; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" max-width="580" style="max-width: 580px; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e7e5df;" cellpadding="0" cellspacing="0">
          
          <!-- Header Banner -->
          <tr>
            <td style="background-color: #10b981; padding: 28px 32px; text-align: left;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="display: inline-block; background-color: rgba(255,255,255,0.2); color: #ffffff; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; padding: 4px 10px; border-radius: 999px; margin-bottom: 8px;">
                      Early Access Lead
                    </span>
                    <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 700; line-height: 1.3;">
                      Pendaftar Baru Vibetification! 🚀
                    </h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 32px;">
              
              <!-- Lead Email Callout -->
              <div style="background-color: #f9f9f8; border-left: 4px solid #10b981; padding: 16px 20px; border-radius: 0 12px 12px 0; margin-bottom: 28px;">
                <span style="font-size: 12px; color: #71717a; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">Email Lead</span>
                <div style="font-size: 18px; font-weight: 700; color: #10b981; margin-top: 4px; word-break: break-all;">
                  <a href="mailto:${cleanEmail}" style="color: #10b981; text-decoration: none;">${cleanEmail}</a>
                </div>
              </div>

              <!-- Survey Responses Section -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                <tr>
                  <td style="padding-bottom: 16px;">
                    <div style="font-size: 13px; font-weight: 700; color: #27272a; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em;">
                      🤖 Coding Agents yang Dipakai:
                    </div>
                    <div>
                      ${agentsList
                        .map(
                          (a) =>
                            `<span style="display: inline-block; background-color: #f0fdf4; color: #166534; border: 1px solid #bbf7d0; font-size: 13px; font-weight: 600; padding: 6px 12px; border-radius: 8px; margin: 3px 6px 3px 0;">${a}</span>`
                        )
                        .join("")}
                    </div>
                  </td>
                </tr>

                <tr>
                  <td style="padding-top: 12px; padding-bottom: 16px; border-top: 1px solid #f4f4f5;">
                    <div style="font-size: 13px; font-weight: 700; color: #27272a; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em;">
                      📱 Notification Devices yang Diinginkan:
                    </div>
                    <div>
                      ${devicesList
                        .map(
                          (d) =>
                            `<span style="display: inline-block; background-color: #eff6ff; color: #1e40af; border: 1px solid #bfdbfe; font-size: 13px; font-weight: 600; padding: 6px 12px; border-radius: 8px; margin: 3px 6px 3px 0;">${d}</span>`
                        )
                        .join("")}
                    </div>
                  </td>
                </tr>

                <tr>
                  <td style="padding-top: 16px; border-top: 1px solid #f4f4f5; font-size: 13px; color: #71717a;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td><strong>Waktu Masuk:</strong></td>
                        <td align="right" style="color: #27272a;">${submissionTime} WIB</td>
                      </tr>
                      <tr>
                        <td style="padding-top: 6px;"><strong>Sumber Form:</strong></td>
                        <td align="right" style="color: #27272a; padding-top: 6px;">${source}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Action Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #e4e4e7;">
                <tr>
                  <td align="center">
                    <a href="mailto:${cleanEmail}?subject=Halo%20dari%20Vibetification%20%E2%80%94%20Early%20Access%20Pro" 
                       style="display: inline-block; background-color: #1c1c1f; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 600; padding: 12px 28px; border-radius: 999px;">
                      Balas / Hubungi Lead Langsung &rarr;
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #fafafa; border-top: 1px solid #e4e4e7; padding: 20px 32px; text-align: center; font-size: 12px; color: #a1a1aa;">
              Notifikasi otomatis sistem lead Vibetification &bull; Powered by Resend
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: fromSender,
      to: notificationRecipient,
      replyTo: cleanEmail,
      subject: `🎯 Lead Baru Vibetification: ${cleanEmail}`,
      text: `Pendaftar Baru Vibetification!\n\nEmail: ${cleanEmail}\nAgents: ${agentsList.join(", ")}\nDevices: ${devicesList.join(", ")}\nWaktu: ${submissionTime}\nSumber: ${source}`,
      html: htmlContent,
    });

    if (error) {
      console.error("[Waitlist API] Resend error:", error);
      return NextResponse.json(
        { error: error.message || "Gagal mengirim notifikasi email." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error("[Waitlist API] Unexpected error:", err);
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server." },
      { status: 500 }
    );
  }
}
