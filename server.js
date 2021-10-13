//hacer el import de express tradicional
//const express = require('express');
import Express from "express";
import { MongoClient, ObjectId } from "mongodb";
import Cors from 'cors';

const stringConexion =
  "mongodb+srv://sebastiandiaz:juan123@cluster0.t0ami.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(stringConexion, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let conexion;

const app = Express();

app.use(Express.json());
app.use(Cors());

app.get("/prendas", (req, res) => {
  console.log("alguien hizo get en la ruta /prendas");
  conexion
    .collection("prendas")
    .find({})
    .toArray((err, result) => {
      if (err) {
        res.status(500).send("Error consultando las prendas");
      } else {
        res.json(result); //al front
        console.log(result); //a la terminal
      }
    });
});

app.post("/prendas/nuevo", (req, res) => {
  const datosPrenda = req.body;
  console.log("llaves: ", Object.keys(datosPrenda));
  try {
    if (
      Object.keys(datosPrenda).includes("identificador") &&
      Object.keys(datosPrenda).includes("producto") &&
      Object.keys(datosPrenda).includes("valor") &&
      Object.keys(datosPrenda).includes("estado")
    ) {
      //implementar codigo para crear vinculo en la BD
      conexion.collection("prendas").insertOne(datosPrenda, (err, result) => {
        if (err) {
          console.error(err);
          res.sendStatus(500);
        } else {
          console.log(result);
          res.sendStatus(200);
        }
      });
    } else {
      res.sendStatus(500);
    }
  } catch {
    res.sendStatus(500);
  }
});

app.patch("/prendas/editar", (req, res) => {
  console.log("alguien esta haciendo un patch");
  const edicion = req.body;
  console.log(edicion); 
  const filtroPrenda = { _id: new ObjectId(edicion.id) };
  delete edicion.id;
  const operacion = {
    $set: edicion,
  };
  conexion
    .collection("prendas")
    .findOneAndUpdate(  
      filtroPrenda,
      operacion,
      { upsert: true, returnOriginal: true },
      (err, result) => {
        if (err) {
          console.error("error actualizando el producto: ",err);
          res.sendStatus(500);
        } else{
          console.log("actualizado con exito");
          res.sendStatus(200);
        }
      }
    );
});

app.delete("/prendas/eliminar",(req,res) =>{
  const filtroPrenda = { _id: new ObjectId(req.body.id) };
  conexion.collection('prendas').deleteOne(filtroPrenda, (err,result) =>{
    if (err){
      console.error(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});



//para conectarse a la base de datos
const main = () => {
  client.connect((err, db) => {
    if (err) {
      console.error("Error conectando a la base de datos");
    }
    conexion = db.db("tienda");
    console.log("conexion exitosa");

    return app.listen(5000, () => {
      console.log("Escuchando el puerto 5000");
    });
  });
};

main();
