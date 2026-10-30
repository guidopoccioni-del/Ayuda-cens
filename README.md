# AYUDA CENS

Asistente educativo para estudiantes de secundaria de adultos (CENS). Aplicación web instalable y proyecto Android mediante Capacitor.

## Arquitectura
- Cliente web/PWA en `public/`.
- Servidor Node.js/Express que mantiene la clave de OpenAI en el servidor.
- Android generado con Capacitor y compilado mediante GitHub Actions.
- Despliegue del servidor en Render.

## Requisitos
Node.js 20 o superior, npm, una clave de API de OpenAI y (para compilar localmente Android) Android Studio/JDK 17.

## Desarrollo
1. Copiá `.env.example` a `.env` y completá `OPENAI_API_KEY`.
2. Ejecutá `npm install`.
3. Ejecutá `npm start` y abrí `http://localhost:3000`.

No publiques `.env` ni incluyas la clave de API en la aplicación Android.

## Android
El workflow **Build Android APK** genera un APK de depuración y lo publica como artefacto al ejecutar `Actions` o al crear una etiqueta `v*`. También se puede compilar localmente con `npm run android:init` y `npm run android:build`.

## Render
Crear un Web Service desde este repositorio. Render detecta `render.yaml`; configurar `OPENAI_API_KEY` y, opcionalmente, `OPENAI_MODEL` como variables de entorno.

## Uso responsable
AYUDA CENS acompaña el aprendizaje: explica paso a paso, propone ejemplos y ejercicios, y recomienda verificar las consignas con el material de clase. Las respuestas de IA pueden contener errores.
