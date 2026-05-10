import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const NOTIFY_TO = 'okulrdesign@gmail.com';

function teamEmail(data: {
  firstName: string; lastName: string; email: string;
  company: string; phone: string; subject: string; message: string;
}) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>New Contact — Cirvio</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f3;font-family:'Jost',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f3;padding:40px 20px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

      <!-- Header -->
      <tr>
        <td style="background:#1c3a2e;border-radius:16px 16px 0 0;padding:32px 40px;text-align:center;">
          <table cellpadding="0" cellspacing="0" style="margin:0 auto 20px;">
            <tr>
              <td style="font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#8cc9b5;padding-bottom:8px;">
                New contact form submission
              </td>
            </tr>
          </table>
          <!-- Logo text -->
          <div style="font-size:28px;font-weight:200;letter-spacing:0.2em;color:#8cc9b5;">CIRVIO</div>
        </td>
      </tr>

      <!-- Subject banner -->
      <tr>
        <td style="background:#2a5240;padding:14px 40px;text-align:center;">
          <span style="display:inline-block;background:rgba(140,201,181,0.15);border:1px solid rgba(140,201,181,0.3);color:#8cc9b5;font-size:12px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;padding:6px 16px;border-radius:99px;">
            ${data.subject || 'General enquiry'}
          </span>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="background:#ffffff;padding:40px;border-radius:0 0 16px 16px;">

          <h2 style="margin:0 0 24px;font-size:18px;font-weight:600;color:#1a1a18;">
            ${data.firstName} ${data.lastName} sent a message
          </h2>

          <!-- Contact details -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;border:1px solid #e8e8e4;border-radius:12px;overflow:hidden;">
            <tr style="background:#f8f8f6;">
              <td style="padding:10px 16px;font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#888884;width:120px;">Name</td>
              <td style="padding:10px 16px;font-size:14px;color:#1a1a18;font-weight:500;">${data.firstName} ${data.lastName}</td>
            </tr>
            <tr style="border-top:1px solid #e8e8e4;">
              <td style="padding:10px 16px;font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#888884;">Email</td>
              <td style="padding:10px 16px;font-size:14px;"><a href="mailto:${data.email}" style="color:#3d8c72;text-decoration:none;">${data.email}</a></td>
            </tr>
            ${data.company ? `<tr style="border-top:1px solid #e8e8e4;">
              <td style="padding:10px 16px;font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#888884;">Company</td>
              <td style="padding:10px 16px;font-size:14px;color:#1a1a18;">${data.company}</td>
            </tr>` : ''}
            ${data.phone ? `<tr style="border-top:1px solid #e8e8e4;">
              <td style="padding:10px 16px;font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#888884;">Phone</td>
              <td style="padding:10px 16px;font-size:14px;color:#1a1a18;">${data.phone}</td>
            </tr>` : ''}
          </table>

          <!-- Message -->
          <p style="margin:0 0 8px;font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#888884;">Message</p>
          <div style="background:#f8f8f6;border:1px solid #e8e8e4;border-radius:12px;padding:20px;font-size:14px;color:#2a2a28;line-height:1.7;white-space:pre-wrap;">${data.message}</div>

          <!-- Reply CTA -->
          <div style="margin-top:32px;text-align:center;">
            <a href="mailto:${data.email}?subject=Re: ${encodeURIComponent(data.subject || 'Your enquiry')}" style="display:inline-block;background:#1c3a2e;color:#8cc9b5;text-decoration:none;font-size:14px;font-weight:600;padding:12px 28px;border-radius:10px;letter-spacing:0.02em;">
              Reply to ${data.firstName} →
            </a>
          </div>

        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="padding:24px 40px;text-align:center;">
          <p style="margin:0;font-size:12px;color:#aaa;line-height:1.6;">
            This message was submitted via the Cirvio contact form.<br />
            © ${new Date().getFullYear()} Cirvio · Dubai, UAE
          </p>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
}

function senderReceipt(data: {
  firstName: string; lastName: string; email: string;
  company: string; subject: string; message: string;
}) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>We received your message — Cirvio</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f3;font-family:'Jost',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f3;padding:40px 20px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

      <!-- Header -->
      <tr>
        <td style="background:#1c3a2e;border-radius:16px 16px 0 0;padding:40px 40px 32px;text-align:center;">
          <div style="font-size:28px;font-weight:200;letter-spacing:0.2em;color:#8cc9b5;margin-bottom:20px;">CIRVIO</div>
          <h1 style="margin:0;font-size:22px;font-weight:600;color:#ecece8;letter-spacing:-0.01em;">
            We've received your message.
          </h1>
          <p style="margin:10px 0 0;font-size:15px;color:rgba(236,236,232,0.65);line-height:1.6;">
            Hi ${data.firstName}, thanks for reaching out. Our team will get back to you within one business day.
          </p>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="background:#ffffff;padding:40px;border-radius:0 0 16px 16px;">

          <!-- What to expect -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;background:#f0faf6;border:1px solid #c5e8db;border-radius:12px;">
            <tr>
              <td style="padding:20px 24px;">
                <p style="margin:0 0 12px;font-size:13px;font-weight:600;color:#1c3a2e;">What happens next</p>
                <table cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding:4px 0;vertical-align:top;">
                      <span style="display:inline-block;width:20px;height:20px;background:#8cc9b5;border-radius:50%;font-size:11px;font-weight:700;color:#1c3a2e;text-align:center;line-height:20px;margin-right:10px;">1</span>
                    </td>
                    <td style="padding:4px 0;font-size:13px;color:#2a4a3a;line-height:1.5;">Our team reviews your message, usually within a few hours.</td>
                  </tr>
                  <tr>
                    <td style="padding:4px 0;vertical-align:top;">
                      <span style="display:inline-block;width:20px;height:20px;background:#8cc9b5;border-radius:50%;font-size:11px;font-weight:700;color:#1c3a2e;text-align:center;line-height:20px;margin-right:10px;">2</span>
                    </td>
                    <td style="padding:4px 0;font-size:13px;color:#2a4a3a;line-height:1.5;">You'll receive a personalised reply at ${data.email} by the next business day.</td>
                  </tr>
                  <tr>
                    <td style="padding:4px 0;vertical-align:top;">
                      <span style="display:inline-block;width:20px;height:20px;background:#8cc9b5;border-radius:50%;font-size:11px;font-weight:700;color:#1c3a2e;text-align:center;line-height:20px;margin-right:10px;">3</span>
                    </td>
                    <td style="padding:4px 0;font-size:13px;color:#2a4a3a;line-height:1.5;">If your query is about pricing or a demo, we'll suggest a time to connect.</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>

          <!-- Message summary -->
          <p style="margin:0 0 8px;font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#888884;">Your message</p>
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;border:1px solid #e8e8e4;border-radius:12px;overflow:hidden;">
            <tr style="background:#f8f8f6;">
              <td style="padding:10px 16px;font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#888884;width:100px;">Subject</td>
              <td style="padding:10px 16px;font-size:14px;color:#1a1a18;">${data.subject || 'General enquiry'}</td>
            </tr>
            <tr style="border-top:1px solid #e8e8e4;">
              <td style="padding:10px 16px;font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#888884;">Message</td>
              <td style="padding:10px 16px;font-size:14px;color:#2a2a28;line-height:1.65;white-space:pre-wrap;">${data.message}</td>
            </tr>
          </table>

          <!-- CTA -->
          <div style="text-align:center;margin-top:8px;">
            <p style="font-size:13px;color:#888884;margin:0 0 16px;">While you wait, explore what Cirvio can do for your team.</p>
            <a href="https://cirvio.com/features" style="display:inline-block;background:#1c3a2e;color:#8cc9b5;text-decoration:none;font-size:14px;font-weight:600;padding:12px 28px;border-radius:10px;letter-spacing:0.02em;">
              Explore features →
            </a>
          </div>

        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="padding:24px 40px;text-align:center;">
          <p style="margin:0 0 8px;font-size:12px;color:#aaa;">
            © ${new Date().getFullYear()} Cirvio · Dubai, UAE
          </p>
          <p style="margin:0;font-size:12px;color:#ccc;">
            You're receiving this because you submitted the contact form at cirvio.com.
          </p>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, company, phone, subject, message } = body;

    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json({ error: 'Please fill in all required fields.' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await Promise.all([
      // Notification to team
      transporter.sendMail({
        from: `"Cirvio Contact" <${process.env.SMTP_USER}>`,
        to: NOTIFY_TO,
        replyTo: email,
        subject: `[Cirvio] ${subject} — ${firstName} ${lastName}${company ? ` · ${company}` : ''}`,
        html: teamEmail({ firstName, lastName, email, company, phone, subject, message }),
      }),
      // Receipt to sender
      transporter.sendMail({
        from: `"Cirvio" <${process.env.SMTP_USER}>`,
        to: email,
        subject: 'We received your message — Cirvio',
        html: senderReceipt({ firstName, lastName, email, company, subject, message }),
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact] email error:', err);
    return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 });
  }
}
