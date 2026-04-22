"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";

export default function StatusCheckPage() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  async function checkStatus(e: any) {
    e.preventDefault();
    setError("");
    setResult(null);

    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .eq("code", code)
      .single();

    if (!data) {
      setError("Kein Ergebnis gefunden. Prüfe deinen Code.");
      return;
    }

    setResult(data);
  }

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <Navbar />

      <h1>StatusCheck</h1>
      <p>Gib deinen Bewerbungscode ein, um deinen Bewerbungsstatus zu prüfen.</p>

      {/* Formular */}
      <form onSubmit={checkStatus} style={{ marginTop: 20 }}>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Bewerbungscode eingeben"
          required
          style={{
            padding: "10px",
            width: "250px",
            border: "1px solid #999",
            borderRadius: "6px",
            marginRight: "10px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            background: "#111",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Prüfen
        </button>
      </form>

      {/* Fehleranzeige */}
      {error && (
        <p style={{ color: "red", marginTop: "15px" }}>
          {error}
        </p>
      )}

      {/* Ergebnis */}
      {result && (
        <div
          style={{
            marginTop: "30px",
            background: "#1e1e1e",
            color: "white",
            padding: "20px",
            width: "350px",
            borderRadius: "10px",
            boxShadow: "0 0 12px rgba(0,0,0,0.4)",
          }}
        >
          <h2 style={{ marginTop: 0 }}>Bewerbung gefunden</h2>

          <p><b>Name:</b> {result.name}</p>
          <p><b>Stelle:</b> {result.stelle}</p>
          <p><b>Status:</b> {result.status}</p>

          <p style={{ marginTop: "15px" }}>
            <b>Begründung (intern):</b><br />
            <span style={{
              wordBreak: "break-word",
              background: "#2c2c2c",
              padding: "10px",
              display: "block",
              borderRadius: "6px"
            }}>
              {result.text}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
