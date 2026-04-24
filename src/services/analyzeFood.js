export const analyzeFood = async (file) => {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onloadend = async () => {
      try {
        const base64 = reader.result.split(",")[1];

        const response = await fetch("http://localhost:3001/analyze", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            image: base64
          })
        });

        const data = await response.json();
        resolve(data);
      } catch (error) {
        reject(error);
      }
    };

    reader.readAsDataURL(file);
  });
};