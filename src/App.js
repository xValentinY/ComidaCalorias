import React, { useState, useEffect } from "react";
import Camera from "./components/Camera";
import Result from "./components/Result";
import History from "./components/History";
import { analyzeFood } from "./services/analyzeFood";

const App = () => {
  const [view, setView] = useState("camera");
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("historial");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const handleCapture = (base64, imagePreview) => {
    setPreview(imagePreview);
    setView("preview");
  };

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await analyzeFood(preview);
      const now = new Date();

      setResult({
        ...data,
        imagen: preview,
        fecha: now.toLocaleDateString("es-MX"),
        hora: now.toLocaleTimeString("es-MX", {
          hour: "2-digit",
          minute: "2-digit"
        })
      });

      setView("result");
    } catch (err) {
      setError("Error al analizar la imagen.");
    }
    setLoading(false);
  };

  const resizeImage = (base64, maxWidth = 200) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64;

      img.onload = () => {
        const canvas = document.createElement("canvas");

        const scale = maxWidth / img.width;
        canvas.width = maxWidth;
        canvas.height = img.height * scale;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        resolve(canvas.toDataURL("image/jpeg", 0.5));
      };
    });
  };

  const handleSave = async () => {
    try {
      const imagenReducida = await resizeImage(result.imagen);

      const nuevo = {
        ...result,
        imagen: imagenReducida
      };

      let updated = [nuevo, ...history];
      updated = updated.slice(0, 15);

      setHistory(updated);
      localStorage.setItem("historial", JSON.stringify(updated));

      setView("history");
    } catch (error) {
      console.error("Error guardando:", error);
      alert("No se pudo guardar.");
    }
  };

  const handleDelete = (index) => {
    const updated = history.filter((_, i) => i !== index);
    setHistory(updated);
    localStorage.setItem("historial", JSON.stringify(updated));
  };

  const handleRetry = () => {
    setPreview(null);
    setResult(null);
    setView("camera");
  };

  return (
    <div style={appStyle}>
      <div style={containerStyle}>
        
        <h1 style={titleStyle}>FotoCalorías 📸</h1>

        <p style={subtitleStyle}>
          Toma o sube una foto de un alimento para estimar sus calorías
        </p>

        <div style={navStyle}>
          <button onClick={() => setView("camera")} style={navBtn}>
            Cámara
          </button>
          <button onClick={() => setView("history")} style={navBtn}>
            Historial
          </button>
        </div>

        {view === "camera" && <Camera onCapture={handleCapture} />}

        {view === "preview" && (
          <div>
            <img
              src={preview}
              alt="Vista previa"
              style={imageStyle}
            />

            <p style={{ fontSize: 14 }}>¿Se ve bien la foto?</p>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {loading ? (
              <p style={{ color: "#2196F3" }}>Analizando imagen...</p>
            ) : (
              <>
                <button onClick={handleAnalyze} style={btnPrimary}>
                  Analizar
                </button>

                <button onClick={handleRetry} style={btnSecondary}>
                  Repetir
                </button>
              </>
            )}
          </div>
        )}

        {view === "result" && result && (
          <Result
            result={result}
            onSave={handleSave}
            onRetry={handleRetry}
          />
        )}

        {view === "history" && (
          <History history={history} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
};

/* 🎨 ESTILOS */

const appStyle = {
  minHeight: "100vh",
  background: "#f5f7fa",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "sans-serif"
};

const containerStyle = {
  width: "100%",
  maxWidth: 380,
  background: "white",
  padding: 20,
  borderRadius: 16,
  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  textAlign: "center"
};

const titleStyle = {
  color: "#4CAF50",
  marginBottom: 10
};

const subtitleStyle = {
  fontSize: 14,
  color: "#666",
  marginBottom: 20
};

const navStyle = {
  display: "flex",
  gap: 10,
  marginBottom: 20
};

const navBtn = {
  flex: 1,
  padding: "10px",
  fontSize: 14,
  borderRadius: 8,
  border: "none",
  backgroundColor: "#eeeeee",
  cursor: "pointer"
};

const imageStyle = {
  width: "100%",
  borderRadius: 12,
  marginBottom: 10
};

const btnPrimary = {
  marginTop: 12,
  padding: "12px",
  width: "100%",
  fontSize: 16,
  borderRadius: 10,
  border: "none",
  backgroundColor: "#4CAF50",
  color: "white",
  cursor: "pointer"
};

const btnSecondary = {
  marginTop: 8,
  padding: "12px",
  width: "100%",
  fontSize: 15,
  borderRadius: 10,
  border: "none",
  backgroundColor: "#9E9E9E",
  color: "white",
  cursor: "pointer"
};

export default App;