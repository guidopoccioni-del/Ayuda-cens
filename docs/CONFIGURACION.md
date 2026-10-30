# Configuración de AYUDA CENS

## 1. API de IA
Creá una clave desde la plataforma de OpenAI y cargala como variable secreta `OPENAI_API_KEY` en Render. No la pongas en archivos del frontend ni en el APK. La API puede generar costos según el uso y la cuenta.

## 2. Publicar el servidor
En Render, creá un Web Service conectado a `guidopoccioni-del/Ayuda-cens`. El archivo `render.yaml` define los comandos. Agregá `OPENAI_API_KEY` en Environment y desplegá. El plan gratuito puede dormir por inactividad y tener límites.

## 3. APK
En GitHub abrí Actions, elegí Build Android APK y seleccioná Run workflow. Al finalizar, descargá el artefacto `ayuda-cens-debug-apk`. Es un APK de depuración para pruebas, no una versión firmada para publicar en Play Store.

## 4. Conectar la app móvil al servidor
Para producción, el cliente Android debe usar el dominio HTTPS del servicio Render como endpoint API. Esta plantilla web está preparada para servir desde el mismo origen. Para compilar una app móvil que se conecte a un servidor remoto, configurá la URL pública del servicio en el cliente y reconstruí el APK.

## 5. Seguridad
No compartas claves API, no subas el archivo `.env`, y rotá cualquier clave que se haya publicado accidentalmente. Agregá autenticación y controles de abuso antes de abrir el servicio al público.
