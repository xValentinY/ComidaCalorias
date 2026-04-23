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
            inline_data: {
              mime_type: "image/jpeg",
              data: imageBase64
            }
          },
          {
            text: `Analiza esta imagen e identifica si hay alimentos. 
            Responde ÚNICAMENTE en este formato JSON exacto, sin texto extra:
            {
              "alimento": "nombre del alimento principal",
              "calorias": número estimado de kcal,
              "encontrado": true o false
            }
            Si no hay alimento, pon encontrado: false y alimento: "No identificado" y calorias: 0`
          }
        ]
      }]
    })
  });

  const data = await response.json();
  const text = data.candidates[0].content.parts[0].text;
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
};
