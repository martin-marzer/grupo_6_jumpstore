const { body } = require("express-validator")


const validationsLogin = [
    body("username")
    .notEmpty().withMessage("Escribe un Nombre"),
    
    body("email")
    .notEmpty().withMessage("Escribe el email").bail()
    .isEmail().withMessage("Formato Invalido"),
    
    body("password")
    .notEmpty().withMessage("Escribe Una Contraseña")
    ];

module.exports = validationsLogin;