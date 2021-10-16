import { getBD } from "../../db/db.js";
import { ObjectId } from "mongodb";

//queryAllUsuarios
const consultarUsuarios = async (callback) => {
  const baseDeDatos = getBD();
  await baseDeDatos.collection("usuarios").find().toArray(callback);
};

const crearUsuario = async (datosUsuario, callback) => {
  const baseDeDatos = getBD();
  await baseDeDatos.collection("usuarios").insertOne(datosUsuario, callback);
};
    
  
  

const editarUsuario = async (edicion, callback) => {
  const filtroUsuario = { _id: new ObjectId(edicion.id) };
  delete edicion.id;
  const operacion = {
    $set: edicion,
  };
  const baseDeDatos = getBD();
  await baseDeDatos
    .collection("usuarios")
    .findOneAndUpdate(
      filtroUsuario,
      operacion,
      { upsert: true, returnOriginal: true },
      callback
    );
};

const eliminarUsuario = async (id, callback) => {
  const filtroUsuario = { _id: new ObjectId(id) };
  const baseDeDatos = getBD();
  await baseDeDatos.collection("usuarios").deleteOne(filtroUsuario, callback);
};

export { consultarUsuarios, crearUsuario, editarUsuario, eliminarUsuario };
