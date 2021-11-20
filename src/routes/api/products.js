const express = require("express");
const router = express.Router();
const productsAPIController = require("../../controllers/api/productsAPIController");


//primero tiro la data para mostrar (carga el orden de los productos)
router.get("/api/products", productsAPIController.list);

router.get("/api/products/:id", productsAPIController.detail);

module.exports = router;