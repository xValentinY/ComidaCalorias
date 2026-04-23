import React, { useRef, useState } from "react";

const Camera = ({ onCapture }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } }
      });
      videoRef.current.srcObject = stream;
      setStreaming(true);
      setError(null);
    } catch (err) {
      if (err.name === "NotAllowedError") {
        setError("Permiso de cámara denegado. Por favor permite el acceso.");
      } else if (err.name === "NotFoundError") {
        setError("No se encontró ninguna cámara en este dispositivo.");
      } else {
        setError("Error al acceder a la cámara.");
      }
    }
  };

  const takePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    canvas.getContext("2d").drawImage(video, 0, 0);

    const imagePreview = canvas.toDataURL("image/jpeg");
    const imageBase64 = imagePreview.split(",")[1];

    video.srcObject.getTracks().forEach(track => track.stop());
    setStreaming(false);

    onCapture(imageBase64, imagePreview);
  };

  const handleFileUpload = (file) => {
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const base64 = reader.result;
      const preview = base64;
      const clean = base64.split(",")[1];
      onCapture(clean, preview);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div style={{ textAlign: "center" }}>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!streaming && (
        <>
          <button onClick={startCamera} style={btnStyle}>
            Abrir cámara
          </button>

          <button
            onClick={() => fileInputRef.current.click()}
            style={{ ...btnStyle, backgroundColor: "#2196F3" }}
          >
            Subir imagen
          </button>
        </>
      )}

      <video
        ref={videoRef}
        autoPlay
        style={{
          display: streaming ? "block" : "none",
          width: "100%",
          borderRadius: 12
        }}
      />

      <canvas ref={canvasRef} style={{ display: "none" }} />

      {streaming && (
        <button onClick={takePhoto} style={btnStyle}>
          Tomar foto
        </button>
      )}

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={(e) => handleFileUpload(e.target.files[0])}
      />
    </div>
  );
};

const btnStyle = {
  marginTop: 12,
  padding: "12px 24px",
  fontSize: 16,
  borderRadius: 8,
  border: "none",
  backgroundColor: "#4CAF50",
  color: "white",
  cursor: "pointer"
};

export default Camera;