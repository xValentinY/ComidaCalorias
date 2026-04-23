const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

export const analyzeFood = async (imageBase64) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{
        parts: [
          {
            text: `Analiza esta imagen. Si hay un alimento responde SOLO esto sin nada más:
{"alimento":"nombre","calorias":número,"encontrado":true}
Si no hay alimento responde SOLO esto:
{"alimento":"No identificado","calorias":0,"encontrado":false}`
          },
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: imageBase64
            }
          }
        ]
      }]
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.log(errorText); // 👈 DEBUG
    throw new Error("Error en la API");
  }

  const data = await response.json();

  console.log(data); // 👈 DEBUG

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

  const match = text?.match(/\{.*\}/s);
  if (!match) throw new Error("Respuesta inválida");

  return JSON.parse(match[0]);
};