import Navbar from "@/components/Navbar";
import UButton from "@/components/UButton";
import Link from "next/link";

export default function HomePage() {
  return (
    <div>

      <Navbar />

      {/* UP N ATOM HERO SECTION */}
      <header
        style={{
          padding: "80px 20px",
          background: "#1c1c1c",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontFamily: "Anton",
            fontSize: "70px",
            color: "#ff0000",
            textShadow: "0 0 12px rgba(255,0,0,0.9)",
            marginBottom: "10px",
          }}
        >
          UP N ATOM Bewerbungsportal
        </h1>

        <p
          style={{
            fontFamily: "Bebas Neue",
            fontSize: "28px",
            letterSpacing: "2px",
            opacity: 0.9,
          }}
        >
          „Explosiver Geschmack – starkes Team!“ 🍔
        </p>
      </header>

      {/* INHALT */}
      <main
        style={{
          maxWidth: "900px",
          margin: "40px auto",
          padding: "20px",
          color: "white",
        }}
      >

        {/* Voraussetzungen */}
        <section style={{ marginBottom: "40px" }}>
          <h2
            style={{
              fontFamily: "Anton",
              fontSize: "40px",
              color: "#ff0000",
              marginBottom: "10px",
            }}
          >
            Voraussetzungen
          </h2>

          <ul
            style={{
              fontSize: "22px",
              lineHeight: "32px",
              listStyleType: "square",
              marginLeft: "25px",
            }}
          >
            <li>Zuverlässigkeit</li>
            <li>Teamfähigkeit</li>
            <li>Motivation</li>
            <li>Regelmäßige Aktivität (mind. 2–3 Tage pro Woche)</li>
            <li>Multitasking‑Fähigkeit</li>
            <li>Freundlichkeit</li>
            <li>Anschreiben (wird im Bewerbungsformular hochgeladen)</li>
          </ul>
        </section>

        {/* Ablauf */}
        <section style={{ marginBottom: "40px" }}>
          <h2
            style={{
              fontFamily: "Anton",
              fontSize: "40px",
              color: "#ff0000",
              marginBottom: "10px",
            }}
          >
            Ablauf
          </h2>

          <ol
            style={{
              fontSize: "22px",
              lineHeight: "32px",
              marginLeft: "25px",
            }}
          >
            <li>Auf „Bewerben“ klicken</li>
            <li>Formular vollständig ausfüllen</li>
            <li>Du erhältst einen persönlichen Bewerbungscode</li>
            <li>Mit dem Code kannst du jederzeit deinen Status abrufen</li>
            <li>Zuständige Mitarbeiter prüfen & bearbeiten deine Bewerbung</li>
          </ol>
        </section>

        {/* CTA BOX */}
        <section
          style={{
            padding: "25px",
            background: "#2a2a2a",
            borderRadius: "12px",
            textAlign: "center",
            boxShadow: "0 0 10px rgba(255,0,0,0.4)",
          }}
        >
          <h2
            style={{
              fontFamily: "Anton",
              color: "#ff0000",
              fontSize: "35px",
              marginBottom: "15px",
            }}
          >
            Bereit, dich zu bewerben?
          </h2>

          {/* UButton mit Link */}
          <Link href="/bewerben">
            <UButton>Jetzt Bewerben 🍔</UButton>
          </Link>
        </section>
      </main>
    </div>
  );
}
