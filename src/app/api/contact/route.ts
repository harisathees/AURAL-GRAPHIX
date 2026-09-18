import { NextResponse } from "next/server";

/**
 * Contact endpoint. Validates the payload and hands it to whichever transport
 * you wire up (email, CRM, webhook). Kept transport-agnostic on purpose.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();

  const errors: string[] = [];
  if (name.length < 2) errors.push("name");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.push("email");
  if (phone.replace(/\D/g, "").length < 7) errors.push("phone");

  if (errors.length) {
    return NextResponse.json({ error: "Validation failed", fields: errors }, { status: 422 });
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...body, receivedAt: new Date().toISOString() }),
    });
    if (!res.ok) {
      return NextResponse.json({ error: "Delivery failed" }, { status: 502 });
    }
  }

  return NextResponse.json({ ok: true });
}
