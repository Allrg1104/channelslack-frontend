// pages/installed.js
import { useEffect } from "react";

export default function InstalledPage() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const team = params.get("team");
    console.log("✅ App instalada para el equipo:", team);

    // 🔁 Aquí podrías redirigir automáticamente a tu dashboard:
    window.location.href = `/dashboard?team=${team}`;
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "5rem" }}>
      <h1>✅ Instalación completada</h1>
      <p>Slack conectado correctamente. Redirigiendo...</p>
    </div>
  );
}
