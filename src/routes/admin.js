const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/administrator", adminController.administrator);
router.get("/administratorToolsProducts", adminController.administratorTools)
router.get("/productCreate", adminController.productCreate)
router.get("/productEdit", adminController.productEdit)


module.exports = router;