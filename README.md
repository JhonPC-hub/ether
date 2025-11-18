# ETHER - Catálogo de Perfumes

Catálogo de perfumes minimalista en blanco y negro con sistema de compras integrado con WhatsApp.

## Características

- Catálogo de más de 20 perfumes de diferentes marcas
- Sistema de búsqueda y filtrado
- Carrito de compras
- Integración con WhatsApp para compras
- Sistema de autenticación de usuarios
- Historial de compras
- Panel de administración
- Sistema de perfumes más vendidos
- Estética minimalista en blanco y negro con animaciones

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm start
```

La aplicación se abrirá en [http://localhost:3000](http://localhost:3000)

## Build para producción

```bash
npm run build
```

## Deploy a GitHub Pages

1. Asegúrate de actualizar el campo `homepage` en `package.json` con tu usuario de GitHub:
   ```json
   "homepage": "https://tu-usuario.github.io/ether"
   ```

2. Ejecuta:
   ```bash
   npm run deploy
   ```

Esto creará una rama `gh-pages` y desplegará la aplicación en GitHub Pages.

## Configuración inicial

### Usuario Administrador

- **Email:** `admin@ether.com`
- **Contraseña:** `admin123`

## Tecnologías

- React.js
- CSS3
- localStorage para persistencia de datos

## Licencia

MIT

