const express = require("express");
const router = express.Router();
const usersAPIController = require("../../controllers/api/usersAPIController");


//primero tiro la data para mostrar (carga el orden de los productos)
router.get("/api/users", usersAPIController.list);

router.get("/api/users/:id", usersAPIController.detail);

module.exports = router;