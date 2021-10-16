import Express from "express";
import { getBD } from "../../db/db.js";
import { queryAllPrendas, crearPrenda, editarPrenda } from "../../controllers/prendas/controller.js";

const rutasPrenda = Express.Router();

const genercCallback = (res) => (err, result) => {
    if (err) {
      res.status(500).send("Error consultando las prendas");
    } else {
      res.json(result);
    };
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
  const filtroPrenda = { _id: new ObjectId(req.body.id) };
  const baseDeDatos = getBD();
  baseDeDatos.collection("prendas").deleteOne(filtroPrenda, (err, result) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

export default rutasPrenda;
