# Prueba Técnica (Version acotada red social)

Este proyecto es una aplicación frontend desarrollada como parte de una prueba técnica, intenta asimilarse a Twitter. Puede ejecutarse localmente en modo desarrollo o construirse y servirse usando Docker y Nginx.

---
## Tests . Para correr los tests usa

npm run test

## 🐳 Ejecutar con Docker

### 1. Requisitos

- Docker instalado y en ejecución: https://docs.docker.com/get-docker/

### 2. Construir la imagen

- docker build -t prueba-tecnica .

### 3. Ejecutar el contenedor

- docker run -d -p 8080:80 prueba-tecnica

### 4. La aplicación corre en:

- http://localhost:8080

## Ejecutar manualmente (modo desarrollo)

### 1. Requisitos

- Node.js (v18 recomendado)

### 2. Instalar dependencias

- npm install

### 3. Ejecutar el servidor de desarrollo

- npm run build

### 4. Se inicia en el puerto

- http://localhost:5173

### Generar build de producción

- npm run build