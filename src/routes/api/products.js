const express = require("express");
const router = express.Router();
const productsAPIController = require("../../controllers/api/productsAPIController");
const cors = require('cors')

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

//primero tiro la data para mostrar (carga el orden de los productos)
router.get("/api/products", cors(corsOptions), productsAPIController.list);

router.get("/api/products/:id", productsAPIController.detail);

module.exports = router;