//hacer el import de express tradicional
//const express = require('express');

import Express from "express";
import Cors from "cors";
import dotenv from "dotenv";
import { conectarBD } from "./db/db.js";
import rutasPrenda from "./views/prendas/rutas.js";

dotenv.config({ path: "./.env" });


const app = Express();

app.use(Express.json());
app.use(Cors());
app.use(rutasPrenda);

//para conectarse a la base de datos
const main = () => {
  return app.listen(process.env.PORT, () => {
    console.log(`Escuchando el puerto ${process.env.PORT}`);
  });
};

conectarBD(main);
