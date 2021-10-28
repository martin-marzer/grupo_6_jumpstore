const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const authMiddleware = require("../middlewares/authMiddleware");
const guestMiddleware = require("../middlewares/guestMiddleware");


let db = require("../database/models");
const User = db.User;

const { body } = require("express-validator")

const validations = [
    body("username")
    .notEmpty().withMessage("Escribe un Nombre").bail()
    .isLength({min:3, max:10}).withMessage("Longitud: 3 a 10 Caracteres"),

    body("email")
    .notEmpty().withMessage("Escribe el email").bail()
    .isEmail().withMessage("Formato Invalido")
    .custom(value => {
        User.findOne({
            where: {
                email: value
            }
        })
        .then(user => {
                if (user != null) {
                    return false
                    // console.log(user);
                } else{
                    return true
                }

        })
    }).withMessage("Datos Incorrectos"),

    body("password")
    .notEmpty().withMessage("Escribe Una Contraseña").bail()
    .isLength({min:4, max:15}).withMessage("Longitud: 4 a 15 Caracteres"),

    body("terminos")
    .notEmpty()
];

router.get("/register", guestMiddleware, usersController.register);

router.post("/register", validations, usersController.processRegister);

router.get("/login", guestMiddleware, usersController.login);

router.post("/login", usersController.loginProcess);

router.get('/logout', usersController.logout);

router.get("/profile", authMiddleware, usersController.profile);



module.exports = router;