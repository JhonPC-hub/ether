# Instrucciones para Deploy en GitHub Pages

## Paso 1: Configurar Git (si no lo has hecho antes)

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu-email@example.com"
```

## Paso 2: Crear el repositorio en GitHub

1. Ve a GitHub y crea un nuevo repositorio llamado `ether`
2. NO inicialices con README, .gitignore o licencia (ya los tenemos)

## Paso 3: Configurar el homepage en package.json

Edita `package.json` y cambia la línea `homepage` con tu usuario de GitHub:

```json
"homepage": "https://TU-USUARIO.github.io/ether"
```

Reemplaza `TU-USUARIO` con tu nombre de usuario de GitHub.

## Paso 4: Conectar con el repositorio remoto

```bash
git remote add origin https://github.com/TU-USUARIO/ether.git
git branch -M main
```

Reemplaza `TU-USUARIO` con tu nombre de usuario de GitHub.

## Paso 5: Subir el código

```bash
git add .
git commit -m "Initial commit: ETHER perfume catalog"
git push -u origin main
```

## Paso 6: Deploy a GitHub Pages

```bash
npm run deploy
```

Este comando:
1. Construirá la aplicación (`npm run build`)
2. Publicará los archivos en la rama `gh-pages`
3. GitHub Pages detectará automáticamente esta rama

## Paso 7: Activar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Haz clic en **Settings**
3. En el menú izquierdo, busca **Pages**
4. En **Source**, selecciona la rama `gh-pages` y la carpeta `/ (root)`
5. Guarda los cambios

Tu sitio estará disponible en: `https://TU-USUARIO.github.io/ether`

## Actualizaciones futuras

Cada vez que quieras actualizar el sitio:

```bash
git add .
git commit -m "Descripción de los cambios"
git push
npm run deploy
```

## Nota

Si cambias el nombre de usuario en GitHub o el nombre del repositorio, recuerda actualizar el campo `homepage` en `package.json` antes de hacer deploy.

