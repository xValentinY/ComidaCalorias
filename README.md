# FotoCalorías

Aplicación web que permite analizar alimentos a partir de una imagen y estimar sus calorías de forma rápida y sencilla.

Para poder utilizarse en celular favor de ingresar a este link:
https://comida-calorias-ui4i.vercel.app
## Como funciona

1. El usuario abre la app
2. Puede tomar una foto desde la cámara o subir una imagen desde la galería
3. La imagen se envía al backend en Node.js
4. El backend la procesa con OpenAI GPT-4 Vision
5. Se obtiene el nombre del alimento y una estimación de calorías
6. El resultado se muestra en pantalla
7. El usuario puede guardar el resultado en el historial

## Tecnologías utilizadas

- React (Create React App)
- JavaScript
- Node.js + Express (backend)
- OpenAI API GPT-4 Vision (identificación de alimentos)
- Vercel (deploy frontend)
- Railway (deploy backend)
- LocalStorage (historial)

## Instalación local

Clonar el repositorio:
git clone https://github.com/xValentinY/ComidaCalorias.git

Entrar al proyecto:
cd ComidaCalorias

Instalar dependencias del frontend:
npm install

Instalar dependencias del backend:
cd server
npm install

Variables de entorno - crear archivo /server/.env con:
OPENAI_API_KEY=tu_clave_de_openai

Ejecutar backend (Terminal 1):
cd server
npm start

Ejecutar frontend (Terminal 2):
cd ComidaCalorias
npm start

La app se abrirá en http://localhost:3000

## Uso en celular

No necesitas instalar nada.
Solo abre el link en tu navegador:
https://comida-calorias-ui4i.vercel.app

Recomendado: usar Chrome o Safari
Permitir acceso a la cámara cuando se solicite

## Funcionalidades

- Captura de imagen desde cámara
- Subida de imágenes desde galería
- Análisis de alimentos con IA
- Visualización del nombre del alimento y calorías estimadas
- Historial de consultas con imagen, fecha y hora (máx. 15)
- Eliminación de registros del historial

## Como funciona la identificación de alimentos

La imagen se convierte a base64 y se envía al backend. El backend la procesa con OpenAI GPT-4 Vision, que identifica el alimento principal y estima sus calorías basándose en una porción estándar. La respuesta llega en formato JSON.

## Limitaciones

- La estimación de calorías es aproximada, no es un valor médico
- Requiere HTTPS para usar la cámara en dispositivos móviles
- La API key de OpenAI requiere créditos de pago
- El historial se almacena localmente y no se sincroniza entre dispositivos

## Autor

Desarrollado por Valentin Gamboa para Che-Ek

## Mejoras futuras

- Mejoras de UI/UX
- Modo oscuro
- Convertir a PWA instalable
- Sincronización del historial en la nube
- Identificación de varios alimentos en una misma imagen
- Gráficas de consumo calórico diario
