//hacer el import de express tradicional
//const express = require('express');

import Express from "express";
import Cors from "cors";
import dotenv from "dotenv";
import { conectarBD } from "./db/db.js";
import jwt from "express-jwt";
import jwks from "jwks-rsa";
import rutasPrenda from "./views/prendas/rutas.js";
import rutasUsuario from "./views/usuarios/rutas.js";
import rutasVenta from "./views/ventas/rutas.js";


dotenv.config({ path: "./.env" });
const port=process.env.PORT || 5000;

const app = Express();

app.use(Express.json());
app.use(Cors());

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://misiontic-ventasprendas.us.auth0.com/.well-known/jwks.json'
}),
audience: 'Api-autenticacion-ventaPrendas-mintic',
issuer: 'https://misiontic-ventasprendas.us.auth0.com/',
algorithms: ['RS256']
});
// 4 Y 5, ENVIARLE EL TOKEN A AUTH0 PARA VALIDAR SI ES VALIDO O NO
app.use(jwtCheck);
app.use(rutasPrenda);
app.use(rutasUsuario);
app.use(rutasVenta);

//para conectarse a la base de datos
const main = () => {
  return app.listen(port, () => {
    console.log(`Escuchando el puerto ${port}`);
  });
};

conectarBD(main);
