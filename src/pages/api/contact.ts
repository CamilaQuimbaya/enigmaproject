import type { APIRoute } from 'astro';
import { Resend } from 'resend';

// Este endpoint corre en el servidor (no se prerenderiza).
export const prerender = false;

// Destinatario y remitente. El remitente DEBE estar en un dominio verificado en Resend.
const TO = 'Felix@EnigmaEnterprisesllc.com';
// NOTA: el dominio del remitente debe estar verificado en Resend. Mantener
// enigmaenterprisesllc.com hasta verificar enigmacapitalsolutions.com allí.
const FROM = 'Enigma Capital Solutions <noreply@enigmaenterprisesllc.com>';

const isEmail = (v: unknown): v is string =>
  typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) && v.length <= 254;

// Campos del formulario de solicitud (etiqueta legible por clave)
const FIELDS: [string, string][] = [
  ['fullName', 'Full name'],
  ['email', 'Email'],
  ['phone', 'Phone'],
  ['company', 'Company name'],
  ['amount', 'Funding amount requested'],
  ['useOfFunds', 'Use of funds'],
  ['country', 'Country / Location of project'],
  ['collateralType', 'Type of collateral'],
  ['role', 'Borrower / Broker / Referral partner'],
  ['summary', 'Project summary'],
];

const clean = (v: unknown, max = 2000) =>
  typeof v === 'string' ? v.replace(/[\r\n]{3,}/g, '\n\n').slice(0, max).trim() : '';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const POST: APIRoute = async ({ request }) => {
  const json = (data: unknown, status = 200) =>
    new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });

  // La key vive SOLO en las variables de entorno del host, nunca en el código.
  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!apiKey) return json({ ok: false, error: 'config' }, 500);

  let body: Record<string, unknown> = {};
  try {
    const ct = request.headers.get('content-type') || '';
    if (ct.includes('application/json')) {
      body = await request.json();
    } else {
      body = Object.fromEntries((await request.formData()).entries());
    }
  } catch {
    return json({ ok: false, error: 'bad_request' }, 400);
  }

  if (!isEmail(body.email)) return json({ ok: false, error: 'invalid_email' }, 422);

  const rows = FIELDS.map(([key, label]) => {
    const val = clean(body[key], key === 'summary' ? 4000 : 200);
    return { label, val: val || '—' };
  });

  const textLines = rows.map((r) => `${r.label}: ${r.val}`).join('\n');
  const htmlRows = rows
    .map((r) => `<tr><td style="padding:6px 14px 6px 0;color:#888;white-space:nowrap;vertical-align:top">${esc(r.label)}</td><td style="padding:6px 0;color:#111;font-weight:600">${esc(r.val).replace(/\n/g, '<br>')}</td></tr>`)
    .join('');

  const who = clean(body.fullName, 120) || (body.email as string);
  const type = clean(body.role, 80);

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: body.email as string,
      subject: `New funding request — ${who}${type ? ` (${type})` : ''}`,
      text: `New funding request from the Enigma Capital Solutions website\n\n${textLines}`,
      html: `<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#111">
        <h2 style="font-family:Georgia,serif;color:#8a1a24;margin:0 0 4px">New funding request</h2>
        <p style="color:#666;margin:0 0 16px">Submitted from enigmacapitalsolutions.com</p>
        <table style="border-collapse:collapse">${htmlRows}</table>
      </div>`,
    });
    if (error) return json({ ok: false, error: 'send_failed' }, 502);
    return json({ ok: true });
  } catch {
    return json({ ok: false, error: 'send_failed' }, 502);
  }
};
