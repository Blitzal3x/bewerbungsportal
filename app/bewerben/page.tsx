"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function BewerbenPage() {
  const [submittedCode, setSubmittedCode] = useState<string | null>(null);

  async function handleSubmit(e: any) {
    e.preventDefault();

    // FORM-VALUES
    const name = e.target.name.value;
    const discord = e.target.discord.value;
    const telefon = e.target.telefon.value;
    const stelle = e.target.stelle.value;
    const alter = e.target.alter.value;
    const selbstvorstellung = e.target.selbstvorstellung.value;
    const erfahrung = e.target.erfahrung.value;
    const zeiten = e.target.zeiten.value;
    const fuehrerschein = e.target.fuehrerschein.value;
    const anschreibenFile = e.target.anschreiben.files[0];

    // Bewerbungscode
    const randomCode = "BW-" + Math.floor(1000 + Math.random() * 9000);

    // -----------------------------
    // 1. DATEI UPLOAD
    // -----------------------------
    let anschreiben_url = null;

    if (anschreibenFile) {
      const fileName = `${randomCode}-${anschreibenFile.name}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("anschreiben")
        .upload(fileName, anschreibenFile);

      if (uploadError) {
        console.error("UPLOAD ERROR:", uploadError);
        alert("Upload Fehler: " + uploadError.message);
        return;
      }

      anschreiben_url =
        process.env.NEXT_PUBLIC_SUPABASE_URL +
        "/storage/v1/object/public/anschreiben/" +
        fileName;
    }

    // -----------------------------
    // 2. INSERT IN DIE TABELLE
    // -----------------------------
    const { data: insertData, error: insertError } = await supabase
      .from("applications")
      .insert({
        name,
        discord,
        telefon,
        stelle,
        alter,
        selbstvorstellung,
        erfahrung,
        zeiten,
        fuehrerschein,
        anschreiben_url,
        code: randomCode,
        status: "Offen",
      });

    if (insertError) {
      console.error("DB INSERT ERROR:", insertError);
      alert("DB Fehler: " + JSON.stringify(insertError, null, 2));
      return;
    }

    setSubmittedCode(randomCode);
  }

  // Erfolg → Code anzeigen
  if (submittedCode) {
    return (
      <div style={{ fontFamily: "sans-serif" }}>
        <Navbar />
        <div style={{ padding: "40px", textAlign: "center" }}>
          <h1>Vielen Dank für deine Bewerbung!</h1>
          <p>Dein Bewerbungscode:</p>
          <h2 style={{ fontSize: "32px", marginTop: "10px" }}>
            {submittedCode}
          </h2>

          <p style={{ marginTop: "20px" }}>
            Bewahre ihn gut auf – damit kannst du deinen Bewerbungsstatus
            abrufen.
          </p>
        </div>
      </div>
    );
  }

  // Formular
  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <Navbar />
      <div style={{ maxWidth: "600px", margin: "40px auto", color: "white" }}>
        <h1 style={{ fontFamily: "Anton", fontSize: "32px", color: "#ff0000" }}>
          Bewerbung
        </h1>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            marginTop: "20px",
          }}
          encType="multipart/form-data"
        >
          <input name="name" placeholder="Name" required className="input" />

          <input
            name="discord"
            placeholder="E‑mail (Discord Name)"
            required
            className="input"
          />

          <input
            name="telefon"
            placeholder="Telefonnummer"
            className="input"
          />

          <input
            name="stelle"
            placeholder="Für welche Stelle?"
            required
            className="input"
          />

          <input
            name="alter"
            placeholder="Alter oder Geburtsdatum"
            className="input"
          />

          <textarea
            name="selbstvorstellung"
            placeholder="Kurze Selbstvorstellung"
            rows={3}
            className="input"
          />

          <textarea
            name="erfahrung"
            placeholder="Gastro‑ oder Service‑Erfahrung (optional)"
            rows={3}
            className="input"
          />

          <textarea
            name="zeiten"
            placeholder="Zu welchen Uhrzeiten bist du aktiv?"
            rows={3}
            className="input"
          />

          <textarea
            name="fuehrerschein"
            placeholder="Welche Führerscheine besitzt du?"
            rows={2}
            className="input"
          />

          <label style={{ marginTop: "10px" }}>
            Anschreiben (PDF/Bild):
          </label>
          <input
            type="file"
            name="anschreiben"
            accept=".pdf,.png,.jpg,.jpeg"
          />

          <button
            type="submit"
            style={{
              padding: "12px",
              background: "#ff0000",
              color: "white",
              borderRadius: "6px",
              border: "none",
              fontSize: "20px",
              cursor: "pointer",
              fontFamily: "Anton",
              boxShadow: "0 0 10px rgba(255,0,0,0.6)",
            }}
          >
            Bewerbung Absenden
          </button>
        </form>
      </div>
    </div>
  );
}
