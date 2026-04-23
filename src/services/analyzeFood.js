import * as mobilenet from "@tensorflow-models/mobilenet";
import "@tensorflow/tfjs";

let model = null;

// Cargar modelo una sola vez
const loadModel = async () => {
  if (!model) {
    model = await mobilenet.load();
  }
  return model;
};

// Mapa de alimentos
const mapa = {
  banana: { nombre: "Plátano", calorias: 105 },
  apple: { nombre: "Manzana", calorias: 95 },
  orange: { nombre: "Naranja", calorias: 62 },
  strawberry: { nombre: "Fresa", calorias: 50 },
  pineapple: { nombre: "Piña", calorias: 82 },
  mango: { nombre: "Mango", calorias: 99 },
  grape: { nombre: "Uvas", calorias: 69 },

  pizza: { nombre: "Pizza", calorias: 300 },
  burger: { nombre: "Hamburguesa", calorias: 350 },
  hotdog: { nombre: "Hot Dog", calorias: 290 },
  fries: { nombre: "Papas fritas", calorias: 312 },

  bread: { nombre: "Pan", calorias: 80 },
  toast: { nombre: "Pan tostado", calorias: 75 },
  cake: { nombre: "Pastel", calorias: 350 },
  cookie: { nombre: "Galleta", calorias: 150 },
  biscuit: { nombre: "Galleta", calorias: 150 },
  donut: { nombre: "Dona", calorias: 260 },
  chocolate: { nombre: "Chocolate", calorias: 210 },

  sandwich: { nombre: "Sándwich", calorias: 250 },
  rice: { nombre: "Arroz", calorias: 200 },
  spaghetti: { nombre: "Pasta", calorias: 220 },
  noodle: { nombre: "Fideos", calorias: 220 },
  soup: { nombre: "Sopa", calorias: 150 },
  salad: { nombre: "Ensalada", calorias: 120 },

  chicken: { nombre: "Pollo", calorias: 239 },
  beef: { nombre: "Carne de res", calorias: 250 },
  pork: { nombre: "Carne de cerdo", calorias: 242 },
  fish: { nombre: "Pescado", calorias: 206 },
  shrimp: { nombre: "Camarones", calorias: 99 },
  egg: { nombre: "Huevo", calorias: 78 },

  coffee: { nombre: "Café", calorias: 5 },
  milk: { nombre: "Leche", calorias: 103 },
  juice: { nombre: "Jugo", calorias: 110 },
  soda: { nombre: "Refresco", calorias: 150 },

  taco: { nombre: "Taco", calorias: 250 },
  burrito: { nombre: "Burrito", calorias: 400 },
  quesadilla: { nombre: "Quesadilla", calorias: 300 }
};

// 👇 palabras clave para detectar si ES comida
const palabrasComida = [
  "food", "dish", "meal", "plate", "cake", "dessert",
  "fruit", "bread", "pizza", "burger", "meat",
  "rice", "salad", "chicken", "fish", "shrimp",
  "egg", "drink", "coffee", "milk",
  "chocolate", "ice cream", "pasta", "noodle"
];

export const analyzeFood = async (imagePreview) => {
  try {
    const model = await loadModel();

    const img = new Image();
    img.src = imagePreview;

    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });

    const predictions = await model.classify(img);

    console.log("Predicciones:", predictions);

    const top = predictions.slice(0, 3);

    // 🔥 1. BUSCAR coincidencia REAL con mapa
    for (const pred of top) {
      const texto = pred.className.toLowerCase();
      const confianza = pred.probability;

      if (confianza < 0.2) continue;

      for (const key in mapa) {
        if (texto.includes(key)) {
          return {
            ...mapa[key],
            encontrado: true,
            confianza
          };
        }
      }
    }

    // 🔥 2. VER si al menos parece comida
    const mejor = predictions[0];
    const texto = mejor.className.toLowerCase();
    const esComida = palabrasComida.some(p => texto.includes(p));

    if (esComida) {
      return {
        nombre: "Alimento aproximado",
        calorias: 200,
        encontrado: true,
        confianza: mejor.probability
      };
    }

    // 🔥 3. NO es comida
    return {
      nombre: "No identificado",
      calorias: 0,
      encontrado: false,
      confianza: 0
    };

  } catch (error) {
    console.error("Error al analizar:", error);

    return {
      nombre: "Error",
      calorias: 0,
      encontrado: false,
      confianza: 0
    };
  }
};