const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");


router.get("/products", productsController.productsList);
router.get("/products/detail/:id", productsController.productDetail);
router.get("/administratorToolsProducts", productsController.administratorTools)


module.exports = router;