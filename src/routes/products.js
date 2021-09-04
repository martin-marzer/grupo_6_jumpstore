const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");

router.get("/products/:OrderBy", productsController.productsList);
router.post("/products/:OrderBy/:FilterBy?", productsController.productsFilter);
router.get("/products/detail/:id", productsController.productDetail);

module.exports = router;