//FotoCalorias

Aplicación web que permite analizar alimentos a partir de una imagen y estimar sus calorías de forma rápida y sencilla.


//Para poder utilizarse con el celular favor de ingresar a este link

https://comida-calorias-ui4i.vercel.app


-- ¿Cómo funciona?

1. El usuario abre la app
2. Puede:
   - Tomar una foto desde la cámara  
   - Subir una imagen
3. La imagen se procesa en la app
4. Se envía a un servicio de análisis (analyzeFood)
5. Se obtiene una estimación de calorías
6. El resultado se muestra en pantalla
7. El usuario puede guardar el resultado en el historial

-- Tecnologías utilizadas

- React (Create React App)
- JavaScript
- CSS (inline styles)
- Vercel (deploy)
- LocalStorage (para historial)

-- Instalación local

Sigue estos pasos para ejecutar el proyecto en tu computadora:

-- Clonar el repositorio: 

git clone https://github.com/xValentinY/ComidaCalorias.git  

-- Entrar al proyecto 

cd ComidaCalorias  

-- Instalar dependencias 

npm install 

-- Ejecutar en modo desarrollo npm start 

La app se abrirá en:
http://localhost:3000


-- Uso en celular

No necesitas instalar nada  
Solo abre el link en tu navegador:

https://comida-calorias-ui4i.vercel.app

1. Recomendado: usar Chrome o Safari  
2. Permitir acceso a la cámara

-- Funcionalidades

- Captura de imagen desde cámara
- Subida de imágenes
- Análisis de alimentos
- Visualización de resultados
- Historial de consultas (máx. 15)
- Eliminación de registros

-- Notas

- La estimación de calorías es aproximada
- Depende del servicio utilizado en analyzeFood
- Se requiere conexión a internet

-- Autor

Desarrollado por: Valentin Gamboa para cheek food

-- Futuras mejoras

- Integración con IA real (visión)
- Mejoras de UI/UX
- Modo oscuro
- Convertir a PWA (instalab
