const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const authMiddleware = require("../middlewares/authMiddleware");
const guestMiddleware = require("../middlewares/guestMiddleware");


let db = require("../database/models");
const User = db.User;

const { body } = require("express-validator")

const validationsRegister = [
    body("username")
    .notEmpty().withMessage("Escribe un Nombre").bail()
    .isLength({min:3, max:10}).withMessage("Longitud: 3 a 10 Caracteres"),

    body("email")
    .notEmpty().withMessage("Escribe el email").bail()
    .isEmail().withMessage("Formato Invalido")
    .custom( async value => {
        let emailCheck = await User.findOne({
            where: {
                email: value
            }
        })
        if (emailCheck !== null) {
            return Promise.reject();
        } 
        return true
    }).withMessage("Email invalido"),

    body("password")
    .notEmpty().withMessage("Escribe Una Contraseña").bail()
    .isLength({min:4, max:15}).withMessage("Longitud: 4 a 15 Caracteres").bail()
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{4,}$/, "i").withMessage("La contraseña debe contener una mayúscula, minúscula, número y un caracter especial"),
    
    body("terminos")
    .notEmpty()
];

const validationsLogin = [
    body("username")
    .notEmpty().withMessage("Escribe un Nombre").bail()
    .isLength({min:3, max:10}).withMessage("Longitud: 3 a 10 Caracteres"),

    body("email")
    .notEmpty().withMessage("Escribe el email").bail()
    .isEmail().withMessage("Formato Invalido"),

    body("password")
    .notEmpty().withMessage("Escribe Una Contraseña").bail()
    .isLength({min:4, max:15}).withMessage("Longitud: 4 a 15 Caracteres").bail()
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{4,}$/, "i").withMessage("La contraseña debe contener una mayúscula, minúscula, número y un caracter especial"),
    
    body("terminos")
    .notEmpty()
]

router.get("/register", guestMiddleware, usersController.register);

router.post("/register", validationsRegister, usersController.processRegister);

router.get("/login", guestMiddleware, usersController.login);

router.post("/login", validationsLogin, usersController.loginProcess);

router.get('/logout', usersController.logout);

router.get("/profile", authMiddleware, usersController.profile);



module.exports = router;