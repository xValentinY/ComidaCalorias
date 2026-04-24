export const analyzeFood = async (imageBase64) => {
  const response = await fetch("http://localhost:3001/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      image: imageBase64
    })
  });

  if (!response.ok) {
    throw new Error("Error en backend");
  }

  return await response.json();
};
