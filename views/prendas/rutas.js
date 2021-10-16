import Express from "express";
import {
  queryAllPrendas,
  crearPrenda,
  editarPrenda,
  eliminarPrenda,
} from "../../controllers/prendas/controller.js";

const rutasPrenda = Express.Router();

const genercCallback = (res) => (err, result) => {
  if (err) {
    res.status(500).send("Error consultando las prendas");
  } else {
    res.json(result);
  }
};

rutasPrenda.route("/prendas").get((req, res) => {
  console.log("alguien hizo get en la ruta /prendas");
  queryAllPrendas(genercCallback(res));
});

rutasPrenda.route("/prendas/nuevo").post((req, res) => {
  crearPrenda(req.body, genercCallback(res));
});

rutasPrenda.route("/prendas/editar").patch((req, res) => {
  editarPrenda(req.body, genercCallback(res));
});

rutasPrenda.route("/prendas/eliminar").delete((req, res) => {
  eliminarPrenda(req.body.id, genercCallback(res));
});

export default rutasPrenda;
