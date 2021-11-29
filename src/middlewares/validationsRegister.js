const { body } = require("express-validator")
let db = require("../database/models");
const User = db.User;


const validationsRegister = [
    body("username")
    .notEmpty().withMessage("Escribe un Nombre").bail()
    .isLength({min:5, max:30}).withMessage("Longitud: 5 a 30 Caracteres").bail()
    .custom( async value => {
        let userCheck = await User.findOne({
            where: {
                username: value
            }
        })
        if (userCheck !== null) {
            let randomNumber = Math.random() * 100;
            throw new Error(`Ya está en uso, le sugerimos: ${userCheck.username}${Math.floor(randomNumber) }`);
            // return Promise.reject(userCheck.username);
        } 
        return true
    }),
    
    body("email")
    .notEmpty().withMessage("Escribe el email").bail()
    .isLength({min:1, max:50}).withMessage("Longitud: 5 a 50 Caracteres").bail()
    .isEmail().withMessage("Formato Invalido").bail()
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
    .isLength({min:4, max:20}).withMessage("Longitud minima: 4 Caracteres").bail()
    .matches(/^[a-zA-Z0-9\,\.\-\_\^\*\¡\¿\?\=\)\(\/\&\%\$\#\"\!]{4,20}$/, "i"),
    
    body("terminos")
    .notEmpty()
];

module.exports = validationsRegister;