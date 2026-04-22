"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";

export default function ApplicationDetail({ params }: any) {
  const [application, setApplication] = useState<any>(null);

  useEffect(() => {
    async function fetchApplication() {
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .eq("id", params.id)
        .single();

      if (data) setApplication(data);
      if (error) console.error(error);
    }
    fetchApplication();
  }, [params.id]);

  async function updateStatus(newStatus: string) {
    const { error } = await supabase
      .from("applications")
      .update({ status: newStatus })
      .eq("id", Number(params.id))

    if (!error) {
      setApplication({ ...application, status: newStatus });
    }
  }

  if (!application) return <p>Lade Daten...</p>;

  return (
    <div style={{ padding: 20 }}>
      <Navbar />
      <h1>Bewerbung von {application.name}</h1>

      <p><b>Stelle:</b> {application.stelle}</p>
      <p><b>Email:</b> {application.email}</p>
      <p><b>Begründung:</b></p>
      <p>{application.text}</p>

      <p><b>Status:</b> {application.status}</p>

      {/* NEUER BUTTON BLOCK */}
      <div style={{ marginTop: 20 }}>
        <button onClick={() => updateStatus("Offen")} style={{ marginRight: 10 }}>
          Offen
        </button>

        <button onClick={() => updateStatus("In Bearbeitung")} style={{ marginRight: 10 }}>
          In Bearbeitung
        </button>

        <button onClick={() => updateStatus("Angenommen")} style={{ marginRight: 10 }}>
          Angenommen
        </button>

        <button onClick={() => updateStatus("Abgelehnt")}>
          Abgelehnt
        </button>
      </div>
    </div>
  );
}
