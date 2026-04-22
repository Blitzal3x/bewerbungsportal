"use client";

import { useEffect } from "react";

export default function AdminModal({ application, onClose, onStatusChange }: any) {
  if (!application) return null;

  // Scrollbar Fix
  useEffect(() => {
    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = scrollBarWidth + "px";

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
    };
  }, []);

  return (
    <>
      {/* Hintergrund */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(0, 0, 0, 0.65)",
          backdropFilter: "blur(3px)",
          zIndex: 9998,
        }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "#1e1e1e",
          padding: "25px",
          borderRadius: "12px",
          color: "white",
          zIndex: 9999,
          width: "550px",
          maxHeight: "80vh",
          overflowY: "auto",
          boxShadow: "0 0 30px rgba(255,0,0,0.5)",
          border: "2px solid red",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "transparent",
            color: "white",
            border: "none",
            fontSize: "25px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          ✖
        </button>

        {/* Titel */}
        <h2
          style={{
            fontFamily: "Anton",
            fontSize: "32px",
            color: "#ff0000",
            marginBottom: "10px",
          }}
        >
          {application.name}
        </h2>

        {/* INFO-FELDER */}
        <p><b>Stelle:</b> {application.stelle}</p>
        <p><b>Discord:</b> {application.discord}</p>
        <p><b>Telefon:</b> {application.telefon || "Keine Angabe"}</p>
        <p><b>Alter / Geburtsdatum:</b> {application.alter || "Keine Angabe"}</p>

        {/* Selbstvorstellung */}
        <p style={{ marginTop: "10px" }}><b>Selbstvorstellung:</b></p>
        <div
          style={{
            background: "#2c2c2c",
            padding: "10px",
            borderRadius: "6px",
            whiteSpace: "pre-wrap",
          }}
        >
          {application.selbstvorstellung || "Keine Angabe"}
        </div>

        {/* Erfahrung */}
        <p style={{ marginTop: "10px" }}><b>Gastro / Service Erfahrung:</b></p>
        <div
          style={{
            background: "#2c2c2c",
            padding: "10px",
            borderRadius: "6px",
            whiteSpace: "pre-wrap",
          }}
        >
          {application.erfahrung || "Keine Erfahrung angegeben"}
        </div>

        {/* Uhrzeiten */}
        <p style={{ marginTop: "10px" }}><b>Aktiv zu folgenden Uhrzeiten:</b></p>
        <div
          style={{
            background: "#2c2c2c",
            padding: "10px",
            borderRadius: "6px",
            whiteSpace: "pre-wrap",
          }}
        >
          {application.zeiten || "Keine Angabe"}
        </div>

        {/* Führerschein */}
        <p style={{ marginTop: "10px" }}><b>Führerscheine:</b></p>
        <div
          style={{
            background: "#2c2c2c",
            padding: "10px",
            borderRadius: "6px",
            whiteSpace: "pre-wrap",
          }}
        >
          {application.fuehrerschein || "Keine"}
        </div>

        {/* Anschreiben Datei */}
        <p style={{ marginTop: "10px" }}><b>Anschreiben:</b></p>

        {application.anschreiben_url ? (
          <a
            href={application.anschreiben_url}
            target="_blank"
            style={{
              display: "inline-block",
              marginTop: "5px",
              background: "#ff0000",
              padding: "10px",
              borderRadius: "6px",
              color: "white",
              textDecoration: "none",
            }}
          >
            Anschreiben ansehen / herunterladen
          </a>
        ) : (
          <p><i>Kein Anschreiben hochgeladen</i></p>
        )}

        {/* STATUS */}
        <p style={{ marginTop: "20px" }}>
          <b>Status:</b> {application.status}
        </p>

        <div style={{
  display: "flex",
  gap: "15px",
  marginTop: "20px",
}}>

  <button
    onClick={() => onStatusChange("Offen")}
    style={{
      background: "#ff0000",
      padding: "12px 20px",
      borderRadius: "10px",
      fontSize: "18px",
      fontFamily: "Anton",
      color: "white",
      border: "none",
      cursor: "pointer",
      flex: 1,
      boxShadow: "0 0 10px rgba(255,0,0,0.7)",
    }}
  >
    Offen
  </button>

  <button
    onClick={() => onStatusChange("In Bearbeitung")}
    style={{
      background: "#ff0000",
      padding: "12px 20px",
      borderRadius: "10px",
      fontSize: "18px",
      fontFamily: "Anton",
      color: "white",
      border: "none",
      cursor: "pointer",
      flex: 1,
      boxShadow: "0 0 10px rgba(255,0,0,0.7)",
    }}
  >
    In Bearbeitung
  </button>

  <button
    onClick={() => onStatusChange("Angenommen")}
    style={{
      background: "#ff0000",
      padding: "12px 20px",
      borderRadius: "10px",
      fontSize: "18px",
      fontFamily: "Anton",
      color: "white",
      border: "none",
      cursor: "pointer",
      flex: 1,
      boxShadow: "0 0 10px rgba(255,0,0,0.7)",
    }}
  >
    Angenommen
  </button>

  <button
    onClick={() => onStatusChange("Abgelehnt")}
    style={{
      background: "#ff0000",
      padding: "12px 20px",
      borderRadius: "10px",
      fontSize: "18px",
      fontFamily: "Anton",
      color: "white",
      border: "none",
      cursor: "pointer",
      flex: 1,
      boxShadow: "0 0 10px rgba(255,0,0,0.7)",
    }}
  >
    Abgelehnt
  </button>

</div>
      </div>
    </>
  );
}
