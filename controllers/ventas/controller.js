import { getBD } from "../../db/db.js";
import { ObjectId } from "mongodb";

//queryAllVentas
const consultarVentas = async (callback) => {
  const baseDeDatos = getBD();
  await baseDeDatos.collection("ventas").find().toArray(callback);
};

const crearVenta = async (datosVenta, callback) => {
  const baseDeDatos = getBD();
  await baseDeDatos.collection("ventas").insertOne(datosVenta, callback);
};
    
  
  

const editarVenta = async (edicion, callback) => {
  const filtroVenta = { _id: new ObjectId(edicion.id) };
  delete edicion.id;
  const operacion = {
    $set: edicion,
  };
  const baseDeDatos = getBD();
  await baseDeDatos
    .collection("ventas")
    .findOneAndUpdate(
      filtroVenta,
      operacion,
      { upsert: true, returnOriginal: true },
      callback
    );
};

const eliminarVenta = async (id, callback) => {
  const filtroVenta = { _id: new ObjectId(id) };
  const baseDeDatos = getBD();
  await baseDeDatos.collection("ventas").deleteOne(filtroVenta, callback);
};

export { consultarVentas, crearVenta, editarVenta, eliminarVenta };
