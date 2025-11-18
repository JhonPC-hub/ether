# Guía Rápida: Subir proyecto ETHER a GitHub

## 📋 Pasos para configurar y subir el proyecto

### 1. Configurar Git (solo la primera vez)

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu-email@example.com"
```

### 2. Crear el repositorio en GitHub

1. Ve a https://github.com
2. Click en **"New"** o **"+"** → **"New repository"**
3. Nombre del repositorio: `ether`
4. **NO marques** "Initialize this repository with a README"
5. Click en **"Create repository"**

### 3. Actualizar package.json

✅ **Ya está configurado** con tu usuario: `JhonPC-hub`

El `package.json` ya tiene configurado:
```json
"homepage": "https://JhonPC-hub.github.io/ether"
```

### 4. Hacer commit inicial

```bash
git commit -m "Initial commit: ETHER perfume catalog"
```

### 5. Conectar con GitHub

```bash
git remote add origin https://github.com/JhonPC-hub/ether.git
git branch -M main
git push -u origin main
```

### 6. Deploy a GitHub Pages

```bash
npm run deploy
```

Este comando construirá la app y la subirá a GitHub Pages.

### 7. Activar GitHub Pages

1. Ve a: https://github.com/JhonPC-hub/ether/settings/pages
2. En **Source**, selecciona:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
3. Click en **Save**

### 8. Tu sitio estará listo

En unos minutos tu sitio estará disponible en:
**https://JhonPC-hub.github.io/ether**

---

## 🔄 Actualizar el sitio (cuando hagas cambios)

```bash
git add .
git commit -m "Descripción de los cambios"
git push
npm run deploy
```

---

## ✅ Listo!

Tu proyecto ETHER ahora está en GitHub y publicado en GitHub Pages.

