//hacer el import de express tradicional
//const express = require('express');
import Express from "express";

//const stringConexion = "";

const app = Express();

app.listen(5000,() => {
    console.log("Escuchando puerto 5000")
});
