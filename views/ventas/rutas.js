import Express from "express";
import {
  consultarVentas,
  crearVenta,
  editarVenta,
  eliminarVenta,
} from "../../controllers/ventas/controller.js";

const rutasVenta = Express.Router();

const genercCallback = (res) => (err, result) => {
  if (err) {
    res.status(500).send("Error consultando las ventas");
  } else {
    res.json(result);
  }
};

rutasVenta.route("/ventas").get((req, res) => {
  console.log("alguien hizo get en la ruta /ventas");
  consultarVentas(genercCallback(res));
});

rutasVenta.route("/ventas/nuevo").post((req, res) => {
  crearVenta(req.body, genercCallback(res));
});

rutasVenta.route("/ventas/editar").patch((req, res) => {
  editarVenta(req.body, genercCallback(res));
});

rutasVenta.route("/ventas/eliminar").delete((req, res) => {
  eliminarVenta(req.body.id, genercCallback(res));
});

export default rutasVenta;
