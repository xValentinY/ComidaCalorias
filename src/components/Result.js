import React from "react";

const Result = ({ result, onSave, onRetry }) => {
  return (
    <div style={containerStyle}>
      <img src={result.imagen} alt="Alimento" style={imgStyle} />
      <h2>🍽️ Resultado del análisis</h2>
      {result.encontrado ? (
        <>
          <p><strong>Alimento:</strong> {result.alimento}</p>
          <p><strong>Calorías estimadas:</strong> {result.calorias} kcal</p>
        </>
      ) : (
        <p style={{ color: "orange" }}>⚠️ No se pudo identificar ningún alimento en la imagen.</p>
      )}
      <p><strong>Fecha:</strong> {result.fecha}</p>
      <p><strong>Hora:</strong> {result.hora}</p>
      <div style={{ marginTop: 16 }}>
        <button onClick={onSave} style={{ ...btnStyle, backgroundColor: "#2196F3" }}>
          💾 Guardar en historial
        </button>
        <button onClick={onRetry} style={{ ...btnStyle, backgroundColor: "#9E9E9E", marginLeft: 8 }}>
          🔄 Tomar otra foto
        </button>
      </div>
    </div>
  );
};

const containerStyle = {
  textAlign: "center",
  padding: 20,
  backgroundColor: "#f9f9f9",
  borderRadius: 12,
  marginTop: 20
};

const imgStyle = {
  width: "100%",
  maxWidth: 300,
  borderRadius: 12,
  marginBottom: 16
};

const btnStyle = {
  padding: "10px 20px",
  fontSize: 15,
  borderRadius: 8,
  border: "none",
  color: "white",
  cursor: "pointer"
};

export default Result;
