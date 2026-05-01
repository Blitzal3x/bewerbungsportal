import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const ROLE_ID = "1494390920022462536";

function buildContent(record: any) {
  const name = record?.name ?? "?";
  const stelle = record?.stelle ?? "?";
  const code = record?.code ?? "?";
  const status = record?.status ?? "Offen";

  // Ping nur bei "Offen" / neu
  const ping = status === "Offen" ? `<@&${ROLE_ID}> ` : "";

  return (
    `${ping}📄 **Bewerbung**\n` +
    `• Name: **${name}**\n` +
    `• Stelle: **${stelle}**\n` +
    `• Code: \`${code}\`\n` +
    `• Status: **${status}**`
  );
}

async function discordRequest(path: string, method: string, body?: any) {
  const token = process.env.DISCORD_BOT_TOKEN;
  if (!token) throw new Error("DISCORD_BOT_TOKEN missing");

  const res = await fetch(`https://discord.com/api/v10${path}`, {
    method,
    headers: {
      Authorization: `Bot ${token}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  let json: any = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {}

  if (!res.ok) {
    throw new Error(`Discord API error ${res.status}: ${text}`);
  }

  return json;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const record = (body as any)?.record ?? (body as any)?.new ?? body;

    const channelId = process.env.DISCORD_CHANNEL_ID;
    if (!channelId) {
      return NextResponse.json({ error: "DISCORD_CHANNEL_ID missing" }, { status: 500 });
    }

    const applicationId = record?.id;
    if (!applicationId) {
      return NextResponse.json({ error: "Missing record.id from webhook payload" }, { status: 400 });
    }

    const content = buildContent(record);

    // Hole gespeicherte Discord-Message-ID (falls vorhanden)
    const { data: existing, error: fetchErr } = await supabase
      .from("applications")
      .select("discord_message_id")
      .eq("id", applicationId)
      .single();

    if (fetchErr) {
      console.error(fetchErr);
      return NextResponse.json({ error: "DB fetch failed" }, { status: 500 });
    }

    const messageId = existing?.discord_message_id;

    if (!messageId) {
      // 1) Erstmals posten
      const msg = await discordRequest(`/channels/${channelId}/messages`, "POST", { content });

      // 2) Message-ID speichern
      const { error: updateErr } = await supabase
        .from("applications")
        .update({ discord_message_id: msg.id })
        .eq("id", applicationId);

      if (updateErr) {
        console.error(updateErr);
        // Nicht abbrechen – Nachricht wurde ja gepostet
      }

      return NextResponse.json({ ok: true, posted: true, messageId: msg.id });
    }

    // Status-Update: Nachricht editieren
    await discordRequest(`/channels/${channelId}/messages/${messageId}`, "PATCH", { content });

    return NextResponse.json({ ok: true, edited: true, messageId });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: e?.message ?? "Server error" }, { status: 500 });
  }
}
