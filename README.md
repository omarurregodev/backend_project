# Express Session + Passport JS + React Js 

## Acerca de la app

Aplicación que se ha venido construyendo con base a los desafios asignados.

### Contruido con

- React Js
- Node.js
- Express
- Passport
- Express Session
- pm2

### Se necesita Node

Así puedes instalar node

- npm
  ```sh
  npm install npm@latest -g
  ```

### Instalación

1. Clonar el repositorio
   ```sh
   git clone https://github.com/omarurregodev/desafio_login_auth
   ```
2. Instalar Paquetería en Client
   ```sh
   cd client
   npm install
   ```
3. Instalar Paquetería en Server
   ```sh
   cd server
   npm install
   ```
4. Crear archivo .env en carpeta ./server el archivo tiene que tener las mismas variables que .env.example si no se va a mover nada de puertos puedes copiar y pegar a tu archivo .env creado. Ahi encontraras las variables necesarias tales como URL de Mongo y puertos.

5. Iniciar Server Side

   ```sh
   cd server
   pm2 start app.js --name="SeverClusterApp" -i max --watch -- 8000
   ```

6. Iniciar Client side

```sh
cd client
npm start
```