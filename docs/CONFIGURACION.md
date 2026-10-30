# Configuración de AYUDA CENS

## 1. Publicar el servidor
En Render, creá un Web Service conectado a `guidopoccioni-del/Ayuda-cens`. El archivo `render.yaml` define los comandos. En Environment agregá la variable secreta `OPENAI_API_KEY` con tu clave de API y desplegá. La API puede generar costos según el uso y la cuenta. El plan gratuito puede dormir por inactividad y tener límites.

Comprobá que `https://TU-SERVICIO.onrender.com/api/health` responda con JSON y `ok: true`.

## 2. Preparar Android para hablar con el servidor
Antes de compilar, editá `public/config.js` y reemplazá la cadena vacía por la URL HTTPS de tu servicio Render, sin barra al final. Ejemplo:
```js
window.AYUDA_CENS_API_BASE = "https://tu-servicio.onrender.com";
```
Guardá el cambio en GitHub. La URL pública del servidor no es una clave secreta. Nunca pongas `OPENAI_API_KEY` en ese archivo.

## 3. Generar el APK
En GitHub abrí la pestaña Actions, elegí **Build Android APK** y seleccioná **Run workflow**. Al finalizar, abrí la ejecución y descargá el artefacto `ayuda-cens-debug-apk`. Es un APK de depuración para pruebas, no una versión firmada para publicar en Play Store.

## 4. Seguridad y límites
No compartas claves API ni subas el archivo `.env`. Rotá cualquier clave que se haya publicado accidentalmente. El servidor incluye límite básico de solicitudes, pero antes de abrirlo al público conviene agregar autenticación, controles de abuso y monitoreo de consumo.
