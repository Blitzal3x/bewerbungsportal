"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin(e: any) {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const { data } = await supabase
      .from("admins")
      .select("*")
      .eq("email", email)
      .eq("password", password)
      .single();

    if (!data) {
      setError("Falsche Zugangsdaten!");
      return;
    }

    router.push("/admin/dashboard");
  }

  return (
    <div style={{ padding: 20 }}>
      <Navbar />
      <h1>Admin Login</h1>

      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 300 }}>
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Passwort" required />
        <button type="submit" style={{ padding: 10, background: "#111", color: "white" }}>Login</button>
      </form>

      {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
    </div>
  );
}
