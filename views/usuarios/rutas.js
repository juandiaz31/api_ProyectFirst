import Express from "express";
import {
  consultarUsuarios,
  crearUsuario,
  editarUsuario,
  eliminarUsuario,
} from "../../controllers/usuarios/controller.js";

const rutasUsuario = Express.Router();

const genercCallback = (res) => (err, result) => {
  if (err) {
    res.status(500).send("Error consultando las usuarios");
  } else {
    res.json(result);
  }
};

rutasUsuario.route("/usuarios").get((req, res) => {
  console.log("alguien hizo get en la ruta /usuarios");
  consultarUsuarios(genercCallback(res));
});

rutasUsuario.route("/usuarios/nuevo").post((req, res) => {
  crearUsuario(req.body, genercCallback(res));
});

rutasUsuario.route("/usuarios/editar").patch((req, res) => {
  editarUsuario(req.body, genercCallback(res));
});

rutasUsuario.route("/usuarios/eliminar").delete((req, res) => {
  eliminarUsuario(req.body.id, genercCallback(res));
});

export default rutasUsuario;
