const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");


//primero tiro la data para mostrar (carga el orden de los productos)
router.get("/products/:OrderBy", productsController.productsList);

//aca llamo primero el metodo para que los link del detalle estes disponibles ( si lo pongo al final no funciona xd)
router.get("/products/detail/:id", productsController.productDetail);

//aca uso para los checkbox, el get es para que puedas conseguir la info si llegas de un link, y el post para cuando apretas el boton
router.get("/products/:OrderBy/:FilterBy?", productsController.productsFilter);
router.post("/products/:OrderBy/:FilterBy?", productsController.productsFilter);


module.exports = router;