export const analyzeFood = async () => {
  const alimentos = [
    { nombre: "Tacos", calorias: 250 },
    { nombre: "Pizza", calorias: 300 },
    { nombre: "Hamburguesa", calorias: 350 },
    { nombre: "Ensalada", calorias: 150 },
    { nombre: "Manzana", calorias: 95 },
    { nombre: "Plátano", calorias: 105 },
    { nombre: "Pollo asado", calorias: 280 }
  ];

  const random = alimentos[Math.floor(Math.random() * alimentos.length)];

  return {
    alimento: random.nombre,
    calorias: random.calorias,
    encontrado: true
  };
};