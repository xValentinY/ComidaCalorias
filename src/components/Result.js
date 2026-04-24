import React from "react";

const Result = ({ result, onSave, onRetry }) => {
  return (
    <div style={containerStyle}>
      
      <img src={result.imagen} alt="Alimento" style={imgStyle} />

      <h2 style={titleStyle}>Resultado del análisis</h2>

      {result.encontrado ? (
        <div style={resultBox}>
          <p style={foodStyle}>🍽️ {result.alimento}</p>
          <p style={caloriesStyle}>🔥 {result.calorias} kcal</p>
        </div>
      ) : (
        <p style={warningStyle}>
          ⚠️ No se pudo identificar el alimento
        </p>
      )}

      <div style={dateBox}>
        <p>📅 {result.fecha}</p>
        <p>🕒 {result.hora}</p>
      </div>

      <button onClick={onSave} style={btnPrimary}>
        💾 Guardar en historial
      </button>

      <button onClick={onRetry} style={btnSecondary}>
        🔄 Tomar otra foto
      </button>
    </div>
  );
};

const containerStyle = { marginTop: 10 };
const imgStyle = { width: "100%", borderRadius: 12, marginBottom: 15 };
const titleStyle = { fontSize: 18, marginBottom: 10, color: "#333" };
const resultBox = { background: "#f1f8f4", borderRadius: 12, padding: 12, marginBottom: 12 };
const foodStyle = { fontSize: 18, fontWeight: "bold", margin: 0 };
const caloriesStyle = { fontSize: 16, color: "#4CAF50", margin: 0 };
const warningStyle = { color: "orange", fontSize: 14, marginBottom: 10 };
const dateBox = { fontSize: 13, color: "#777", marginBottom: 15 };
const btnPrimary = {
  width: "100%", padding: "12px", borderRadius: 10, border: "none",
  backgroundColor: "#2196F3", color: "white", fontSize: 15, cursor: "pointer", marginBottom: 8
};
const btnSecondary = {
  width: "100%", padding: "12px", borderRadius: 10, border: "none",
  backgroundColor: "#9E9E9E", color: "white", fontSize: 15, cursor: "pointer"
};

export default Result;
