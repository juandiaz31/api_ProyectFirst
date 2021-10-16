import { getBD } from "../../db/db.js";
import { ObjectId } from "mongodb";

//queryAllPrendas
const consultarPrendas = async (callback) => {
  const baseDeDatos = getBD();
  await baseDeDatos.collection("prendas").find().toArray(callback);
};

const crearPrenda = async (datosPrenda, callback) => {
  if (
    Object.keys(datosPrenda).includes("producto") &&
    Object.keys(datosPrenda).includes("valor") &&
    Object.keys(datosPrenda).includes("estado")
  ) {
    //implementar codigo para crear vinculo en la BD
    const baseDeDatos = getBD();
    await baseDeDatos.collection("prendas").insertOne(datosPrenda, callback);
  } else {
    return "error";
  }
};

const editarPrenda = async (edicion, callback) => {
  const filtroPrenda = { _id: new ObjectId(edicion.id) };
  delete edicion.id;
  const operacion = {
    $set: edicion,
  };
  const baseDeDatos = getBD();
  await baseDeDatos
    .collection("prendas")
    .findOneAndUpdate(
      filtroPrenda,
      operacion,
      { upsert: true, returnOriginal: true },
      callback
    );
};

const eliminarPrenda = async (id, callback) => {
  const filtroPrenda = { _id: new ObjectId(id) };
  const baseDeDatos = getBD();
  await baseDeDatos.collection("prendas").deleteOne(filtroPrenda, callback);
};

export { consultarPrendas, crearPrenda, editarPrenda, eliminarPrenda };
