import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Supabase Webhook Payload: oft { record: {...} }
    const record = body?.record ?? body?.new ?? body;

    const content =
      `📥 Neue Bewerbung eingegangen!\n` +
      `• Name: **${record?.name ?? "?"}**\n` +
      `• Stelle: **${record?.stelle ?? "?"}**\n` +
      `• Code: \`${record?.code ?? "?"}\`\n` +
      `• Status: **${record?.status ?? "Offen"}**`;

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      return NextResponse.json(
        { error: "DISCORD_WEBHOOK_URL missing" },
        { status: 500 }
      );
    }

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    const text = await res.text();
    if (!res.ok) {
      return NextResponse.json(
        { error: "Discord webhook failed", details: text },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
