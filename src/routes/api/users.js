const express = require("express");
const router = express.Router();
const usersAPIController = require("../../controllers/api/usersAPIController");
const cors = require('cors')

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

//primero tiro la data para mostrar (carga el orden de los productos)
router.get("/api/users", cors(corsOptions), usersAPIController.list);

router.get("/api/users/:id", usersAPIController.detail);

module.exports = router;