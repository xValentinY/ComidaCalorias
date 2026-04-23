import React from "react";

const History = ({ history, onDelete }) => {
  if (history.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: 20, color: "#999" }}>
        <p>📭 No hay análisis en el historial todavía.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>📋 Historial de análisis</h2>
      {history.map((item, index) => (
        <div key={index} style={cardStyle}>
          <img src={item.imagen} alt="Alimento" style={imgStyle} />
          <div style={{ flex: 1 }}>
            <p><strong>🍽️ {item.alimento}</strong></p>
            <p>🔥 {item.calorias} kcal</p>
            <p>📅 {item.fecha} {item.hora}</p>
          </div>
          <button onClick={() => onDelete(index)} style={deleteBtnStyle}>
            🗑️
          </button>
        </div>
      ))}
    </div>
  );
};

const cardStyle = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: 12,
  marginBottom: 12,
  backgroundColor: "#f9f9f9",
  borderRadius: 12,
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
};

const imgStyle = {
  width: 70,
  height: 70,
  objectFit: "cover",
  borderRadius: 8
};

const deleteBtnStyle = {
  background: "none",
  border: "none",
  fontSize: 20,
  cursor: "pointer"
};

export default History;
