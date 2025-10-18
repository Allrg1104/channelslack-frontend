import { useEffect, useState } from "react";
import axios from "axios";

export default function Installed() {
  const [status, setStatus] = useState("Procesando instalación... 🔄");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const team = params.get("team");

    if (!code) {
      setStatus("⚠️ No se recibió el parámetro 'code' de Slack.");
      return;
    }

    // 👉 Cambia esta URL por la de tu backend
    const API_URL = import.meta.env.VITE_API_URL || "https://tu-backend.vercel.app";

    axios
      .post(`${API_URL}/api/slack/exchange`, { code })
      .then((res) => {
        console.log("✅ Slack token guardado correctamente:", res.data);
        setStatus("✅ Integración completada. Redirigiendo...");
        setTimeout(() => {
          window.location.href = `/dashboard?team=${team}`;
        }, 2000);
      })
      .catch((err) => {
        console.error("❌ Error al intercambiar el code:", err);
        setStatus("❌ Error al conectar con Slack. Intenta nuevamente.");
      });
  }, []);

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "6rem",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Instalación de Slack</h1>
      <p style={{ marginTop: "1rem", fontSize: "1.2rem" }}>{status}</p>
    </div>
  );
}
