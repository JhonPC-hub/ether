# Guía: Deploy en Render

## 🚀 Pasos para desplegar ETHER en Render

### 1. Crear cuenta en Render

1. Ve a https://render.com
2. Crea una cuenta (puedes usar tu cuenta de GitHub)
3. Conecta tu cuenta de GitHub si aún no lo has hecho

### 2. Crear nuevo Web Service

1. En el dashboard de Render, haz clic en **"New +"**
2. Selecciona **"Web Service"**
3. Conecta tu repositorio de GitHub:
   - Si no está conectado, haz clic en **"Connect account"** o **"Configure account"**
   - Selecciona el repositorio **"ether"**

### 3. Configurar el servicio

Completa los siguientes campos:

- **Name:** `ether` (o el nombre que prefieras)
- **Environment:** `Node`
- **Build Command:** 
  ```bash
  npm install && npm run build
  ```
- **Start Command:**
  ```bash
  npx serve -s build -l 10000
  ```
- **Plan:** Selecciona **Free** (o el plan que prefieras)

### 4. Variables de entorno (opcional)

No necesitas configurar variables de entorno para esta aplicación, ya que usa localStorage.

### 5. Deploy

1. Haz clic en **"Create Web Service"**
2. Render comenzará a construir y desplegar tu aplicación
3. El proceso puede tardar unos minutos

### 6. Tu sitio estará listo

Una vez completado el deploy, tu sitio estará disponible en:
**https://ether.onrender.com** (o la URL que Render te asigne)

---

## 🔄 Actualizaciones automáticas

Render se conecta automáticamente con GitHub. Cada vez que hagas `git push` a la rama `main`, Render detectará los cambios y desplegará automáticamente una nueva versión.

---

## 📝 Notas importantes

- El primer deploy puede tardar varios minutos
- Render puede tardar unos segundos en "despertar" el servicio en el plan gratuito (cold start)
- Si necesitas un dominio personalizado, puedes configurarlo en la sección "Custom Domains" de Render

---

## ✅ Listo!

Tu aplicación ETHER ahora está desplegada en Render y se actualizará automáticamente con cada push a GitHub.

