import { getBD } from "../../db/db.js";

const queryAllPrendas = async (callback) => {
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
  

export { queryAllPrendas, crearPrenda };
