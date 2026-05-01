import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const record = (body as any)?.record ?? (body as any)?.new ?? body;

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      return NextResponse.json(
        { error: "DISCORD_WEBHOOK_URL missing" },
        { status: 500 }
      );
    }

    const rolePing = "<@&1494390920022462536>";

const content =
  `${rolePing} 📥 Neue Bewerbung eingegangen!\n` +
  `• Name: **${record?.name ?? "?"}**\n` +
  `• Stelle: **${record?.stelle ?? "?"}**\n` +
  `• Code: \`${record?.code ?? "?"}\`\n` +
  `• Status: **${record?.status ?? "Offen"}**`;

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: "Discord webhook failed", details: text },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
