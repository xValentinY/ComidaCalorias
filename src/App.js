import React, { useState, useEffect } from "react";
import Camera from "./components/Camera";
import Result from "./components/Result";
import History from "./components/History";
import { analyzeFood } from "./services/geminiService";

const App = () => {
  const [view, setView] = useState("camera");
  const [preview, setPreview] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("historial");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const handleCapture = (base64, imagePreview) => {
    setImageBase64(base64);
    setPreview(imagePreview);
    setView("preview");
  };

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await analyzeFood(imageBase64);
      const now = new Date();
      setResult({
        ...data,
        imagen: preview,
        fecha: now.toLocaleDateString("es-MX"),
        hora: now.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" })
      });
      setView("result");
    } catch (err) {
      setError("Error al analizar la imagen. Intenta de nuevo.");
    }
    setLoading(false);
  };

  const handleSave = () => {
    const updated = [result, ...history];
    setHistory(updated);
    localStorage.setItem("historial", JSON.stringify(updated));
    setView("history");
  };

  const handleDelete = (index) => {
    const updated = history.filter((_, i) => i !== index);
    setHistory(updated);
    localStorage.setItem("historial", JSON.stringify(updated));
  };

  const handleRetry = () => {
    setPreview(null);
    setImageBase64(null);
    setResult(null);
    setView("camera");
  };

  return (
    <div style={appStyle}>
      <h1 style={{ textAlign: "center", color: "#4CAF50" }}>🥗 FotoCalorías</h1>
      <div style={navStyle}>
        <button onClick={() => setView("camera")} style={navBtn}>📷 Cámara</button>
        <button onClick={() => setView("history")} style={navBtn}>📋 Historial</button>
      </div>

      {view === "camera" && <Camera onCapture={handleCapture} />}

      {view === "preview" && (
        <div style={{ textAlign: "center" }}>
          <img src={preview} alt="Vista previa" style={{ width: "100%", maxWidth: 300, borderRadius: 12 }} />
          <p>¿Se ve bien la foto?</p>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {loading ? (
            <p style={{ color: "#2196F3" }}>⏳ Analizando imagen...</p>
          ) : (
            <>
              <button onClick={handleAnalyze} style={{ ...btnStyle, backgroundColor: "#4CAF50" }}>
                🔍 Analizar
              </button>
              <button onClick={handleRetry} style={{ ...btnStyle, backgroundColor: "#9E9E9E", marginLeft: 8 }}>
                🔄 Repetir
              </button>
            </>
          )}
        </div>
      )}

      {view === "result" && result && (
        <Result result={result} onSave={handleSave} onRetry={handleRetry} />
      )}

      {view === "history" && (
        <History history={history} onDelete={handleDelete} />
      )}
    </div>
  );
};

const appStyle = {
  maxWidth: 480,
  margin: "0 auto",
  padding: 20,
  fontFamily: "sans-serif"
};

const navStyle = {
  display: "flex",
  justifyContent: "center",
  gap: 12,
  marginBottom: 20
};

const navBtn = {
  padding: "10px 20px",
  fontSize: 15,
  borderRadius: 8,
  border: "none",
  backgroundColor: "#e0e0e0",
  cursor: "pointer"
};

const btnStyle = {
  marginTop: 12,
  padding: "12px 24px",
  fontSize: 16,
  borderRadius: 8,
  border: "none",
  color: "white",
  cursor: "pointer"
};

export default App;
