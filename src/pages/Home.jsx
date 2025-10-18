import React, { useState } from "react";
import axios from "axios";

function Home() {
  const [teamId, setTeamId] = useState("");
  const [channelName, setChannelName] = useState("");
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSlackAuth = () => {
    window.location.href = `${API_URL}/api-rest/slack/auth/slack`;
  };

  const handleCreateChannel = async () => {
    if (!teamId || !channelName) return alert("Completa todos los campos");
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/create-channel`, {
        teamId,
        channelName,
      });
      alert(`✅ Canal creado: ${res.data.channelName}`);
    } catch (err) {
      alert("❌ Error al crear el canal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
      <div className="container text-center p-4 shadow-lg rounded bg-white" style={{ maxWidth: "500px" }}>
        <h2 className="text-dark mb-3 fw-bold">Slack Channel Automation</h2>
        <p className="text-muted mb-4 fs-5">Automatiza la creación de tus canales en Slack</p>

        <button onClick={handleSlackAuth} className="btn btn-primary w-100 mb-4">
          <i className="bi bi-slack me-2"></i>Autorizar con Slack
        </button>

        <h5 className="mb-3 text-secondary">Crear Canal Manualmente</h5>
        <input
          type="text"
          placeholder="Team ID (tras autenticación)"
          className="form-control mb-2"
          value={teamId}
          onChange={(e) => setTeamId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nombre del canal"
          className="form-control mb-3"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
        />
        <button
          onClick={handleCreateChannel}
          className="btn btn-success w-100"
          disabled={loading}
        >
          {loading ? "Creando..." : "Crear canal"}
        </button>
      </div>
    </div>
  );
}

export default Home;
