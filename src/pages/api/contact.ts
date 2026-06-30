import type { APIRoute } from 'astro';
import { Resend } from 'resend';

// Este endpoint corre en el servidor (no se prerenderiza).
export const prerender = false;

// Destinatario y remitente. El remitente DEBE estar en un dominio verificado en Resend.
const TO = 'Felix@EnigmaEnterprisesllc.com';
const FROM = 'Enigma Enterprises <noreply@enigmaenterprisesllc.com>';

const isEmail = (v: unknown): v is string =>
  typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) && v.length <= 254;

export const POST: APIRoute = async ({ request }) => {
  const json = (data: unknown, status = 200) =>
    new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });

  // La key vive SOLO en las variables de entorno del host (Netlify), nunca en el código.
  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!apiKey) return json({ ok: false, error: 'config' }, 500);

  let email: unknown, name: unknown, message: unknown;
  try {
    const ct = request.headers.get('content-type') || '';
    if (ct.includes('application/json')) {
      ({ email, name, message } = await request.json());
    } else {
      const form = await request.formData();
      email = form.get('email');
      name = form.get('name');
      message = form.get('message');
    }
  } catch {
    return json({ ok: false, error: 'bad_request' }, 400);
  }

  if (!isEmail(email)) return json({ ok: false, error: 'invalid_email' }, 422);

  const safeName = typeof name === 'string' ? name.slice(0, 120) : '';
  const safeMsg = typeof message === 'string' ? message.slice(0, 4000) : '';

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `Nueva solicitud de consulta — ${safeName || email}`,
      text:
        `Nueva solicitud desde la web de Enigma Enterprises\n\n` +
        `Email: ${email}\n` +
        (safeName ? `Nombre: ${safeName}\n` : '') +
        (safeMsg ? `\nMensaje:\n${safeMsg}\n` : ''),
    });
    if (error) return json({ ok: false, error: 'send_failed' }, 502);
    return json({ ok: true });
  } catch {
    return json({ ok: false, error: 'send_failed' }, 502);
  }
};
