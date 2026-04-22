"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";
import AdminModal from "@/components/AdminModal";
import UButton from "@/components/UButton";

// Status Badge Farben (Up N Atom Style)
function StatusBadge({ status }: { status: string }) {
  const colors: any = {
    Offen: "#ffeb3b",          // Gelb
    "In Bearbeitung": "#ff9800", // Orange
    Angenommen: "#4caf50",     // Grün
    Abgelehnt: "#f44336",      // Rot
  };

  return (
    <span
      style={{
        padding: "6px 12px",
        background: colors[status] || "#777",
        color: "black",
        borderRadius: "8px",
        fontFamily: "Anton",
        letterSpacing: "1px",
        fontSize: "16px",
      }}
    >
      {status}
    </span>
  );
}

export default function Dashboard() {
  const [applications, setApplications] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("applications")
        .select("*")
        .order("id", { ascending: false });

      if (data) setApplications(data);
    }
    load();
  }, []);

  async function changeStatus(id: number, status: string) {
    await supabase.from("applications").update({ status }).eq("id", id);

    setApplications(
      applications.map((a) => (a.id === id ? { ...a, status } : a))
    );

    setSelected({ ...selected, status });
  }

  return (
    <div style={{ padding: 20, color: "white" }}>
      <Navbar />
      <h1
        style={{
          fontFamily: "Anton",
          fontSize: "50px",
          marginBottom: "20px",
          color: "#ff0000",
        }}
      >
        Admin Dashboard
      </h1>

      {/* Tabelle im Up N Atom Stil */}
      <table
        style={{
          width: "100%",
          marginTop: 20,
          borderCollapse: "collapse",
          background: "#2a2a2a",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <thead>
          <tr
            style={{
              background: "#ff0000",
              color: "white",
              fontFamily: "Anton",
              fontSize: "20px",
              letterSpacing: "1px",
            }}
          >
            <th style={{ padding: "15px" }}>Name</th>
            <th style={{ padding: "15px" }}>Stelle</th>
            <th style={{ padding: "15px" }}>Status</th>
            <th style={{ padding: "15px" }}>Mehr</th>
          </tr>
        </thead>

        <tbody>
          {applications.map((app) => (
            <tr
              key={app.id}
              style={{
                borderBottom: "1px solid #444",
                textAlign: "center",
                height: "60px",
              }}
            >
              <td style={{ fontSize: "20px" }}>{app.name}</td>
              <td style={{ fontSize: "20px" }}>{app.stelle}</td>
              <td>
                <StatusBadge status={app.status} />
              </td>
              <td>
                <UButton onClick={() => setSelected(app)} style={{ fontSize: "18px" }}>
                  Anzeigen
                </UButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      {selected && (
        <AdminModal
          application={selected}
          onClose={() => setSelected(null)}
          onStatusChange={(status: string) => changeStatus(selected.id, status)}
        />
      )}
    </div>
  );
}
