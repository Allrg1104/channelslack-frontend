import React, { useState } from "react";
import api from "../api/apiConfig";

const ChannelForm = ({ teamId }) => {
  const [name, setName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Creando canal...");

    try {
      const res = await api.post("/channel/create", {
        team_id: teamId,
        name,
        is_private: isPrivate,
      });
      setMessage(`✅ Canal creado: ${res.data.channel.name}`);
    } catch (err) {
      console.error(err);
      setMessage("❌ Error creando canal");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card mt-3 p-3">
      <h5>Nuevo canal en Slack</h5>

      <div className="mb-2">
        <input
          type="text"
          className="form-control"
          placeholder="Nombre del canal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="form-check mb-2">
        <input
          className="form-check-input"
          type="checkbox"
          checked={isPrivate}
          onChange={() => setIsPrivate(!isPrivate)}
        />
        <label className="form-check-label">Privado</label>
      </div>

      <button className="btn btn-primary" type="submit">
        Crear
      </button>

      {message && <div className="alert alert-info mt-3">{message}</div>}
    </form>
  );
};

export default ChannelForm;
