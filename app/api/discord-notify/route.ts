import { NextRequest, NextResponse } from "next/server";

const ROLE_ID = "1494390920022462536"; // deine Rolle

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Supabase Webhook Payload kann variieren:
    // wir versuchen mehrere mögliche Felder
    const record = (body as any)?.record ?? (body as any)?.new ?? body;
    const eventType =
      (body as any)?.type ?? (body as any)?.eventType ?? (body as any)?.event ?? null;

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      return NextResponse.json({ error: "DISCORD_WEBHOOK_URL missing" }, { status: 500 });
    }

    const name = record?.name ?? "?";
    const stelle = record?.stelle ?? "?";
    const code = record?.code ?? "?";
    const status = record?.status ?? "Offen";

    // 1) Bei NEUER Bewerbung: Ping
    // Wir erkennen INSERT entweder über eventType, oder falls nicht vorhanden: wenn status "Offen" + code existiert
    const isInsert = String(eventType).toUpperCase() === "INSERT";

    // 2) Bei UPDATE: nur posten, wenn Status "In Bearbeitung" ist (kein Ping)
    const isUpdate = String(eventType).toUpperCase() === "UPDATE";

    let content: string | null = null;

    if (isInsert) {
      content =
        `<@&${ROLE_ID}> 📥 **Neue Bewerbung eingegangen!**\n` +
        `• Name: **${name}**\n` +
        `• Stelle: **${stelle}**\n` +
        `• Code: \`${code}\`\n` +
        `• Status: **${status}**`;
    } else if (isUpdate) {
      // Nur wenn jetzt "In Bearbeitung"
      if (status === "In Bearbeitung") {
        content =
          `🛠️ Bewerbung ist jetzt **In Bearbeitung**\n` +
          `• Name: **${name}**\n` +
          `• Stelle: **${stelle}**\n` +
          `• Code: \`${code}\``;
      } else {
        // andere Updates ignorieren
        return NextResponse.json({ ok: true, skipped: true });
      }
    } else {
      // Falls eventType nicht mitkommt, nichts kaputt machen:
      // wir posten nur, wenn status "In Bearbeitung" ist (ohne Ping) oder wenn status "Offen" als "neu" erkannt wird.
      if (status === "In Bearbeitung") {
        content =
          `🛠️ Bewerbung ist jetzt **In Bearbeitung**\n` +
          `• Name: **${name}**\n` +
          `• Stelle: **${stelle}**\n` +
          `• Code: \`${code}\``;
      } else {
        return NextResponse.json({ ok: true, skipped: true });
      }
    }

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    const text = await res.text();
    if (!res.ok) {
      return NextResponse.json({ error: "Discord webhook failed", details: text }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
