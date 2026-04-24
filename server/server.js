import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

console.log("INICIANDO SERVER...");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/analyze", async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ error: "No se envió imagen" });
    }

    // 🔥 DEBUG
    console.log("Imagen recibida:", image.substring(0, 50));

    // 🔥 ASEGURAR FORMATO CORRECTO BASE64
    const imageFormatted = image.startsWith("data:")
      ? image
      : `data:image/jpeg;base64,${image}`;

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: `Identifica el alimento y estima sus calorías.

Responde ÚNICAMENTE en JSON válido sin texto extra:
{"alimento":"nombre","calorias":numero,"encontrado":true}

Si no hay alimento:
{"alimento":"No identificado","calorias":0,"encontrado":false}`
            },
            {
              type: "input_image",
              image_url: imageFormatted
            }
          ]
        }
      ]
    });

    // 🔥 EXTRAER TEXTO SEGURO
    const text = response.output?.[0]?.content?.[0]?.text || "";

    console.log("Respuesta IA RAW:", text);

    // 🔥 LIMPIAR RESPUESTA
    const clean = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const match = clean.match(/\{.*\}/s);

    if (!match) {
      console.error("No se encontró JSON válido:", clean);
      return res.status(500).json({ error: "Formato inválido de IA" });
    }

    const parsed = JSON.parse(match[0]);

    console.log("Respuesta IA PARSEADA:", parsed);

    res.json(parsed);

  } catch (error) {
    console.error("ERROR BACKEND COMPLETO:", error);
    res.status(500).json({ error: "Error analizando imagen" });
  }
});

app.listen(3001, () => {
  console.log("🚀 Server corriendo en http://localhost:3001");
});