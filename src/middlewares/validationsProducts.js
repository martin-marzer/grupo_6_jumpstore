const { body } = require("express-validator")

const validationsProducts = [
body("name")
    .notEmpty().withMessage("Escribe un Nombre").bail()
    .isLength({ min: 5, max: 100 }).withMessage("Longitud: 5 a 100 Caracteres"),

body("fechaEntrada")
    .notEmpty().withMessage("No puede estar vacío").bail()
    .isDate().withMessage("Elige una fecha"),

body("talle")
    .notEmpty().withMessage("Elige el talle").bail()
    .isInt().withMessage(),

body("marca")
    .notEmpty().withMessage("Elige la marca").bail()
    .isInt().withMessage(),

body("precio")
    .notEmpty().withMessage("Escribe el precio").bail()
    .matches(/^[0-9]*\.?[0-9]*$/).withMessage("solo números"),

body("descuento")
    .notEmpty().withMessage("Escribe el descuento").bail()
    .matches(/^[0-9]+$/).withMessage("solo números").bail()
    .custom(value => {
    if (value >= 0 && value <= 100) {
        return true
    } else {
        return false
    }

    }).withMessage("de 0 a 100"),

body("stock")
    .notEmpty().withMessage("Escribe el descuento").bail()
    .matches(/^[0-9]+$/).withMessage("solo números"),

// body("myFile")
// .custom(( value, { req }) => {
//   let file = req.file
//   let validExt = [".jpg", ".png", ".jpeg"]

//   if (!file) {
//     throw new Error("tenes que subir una imagenes")
//   }
//   return true
// }),

body("descripcion")
    .notEmpty().withMessage("Escribe la descripcion").bail()
    .isLength({ min: 1, max: 200 }).withMessage("Longitud: 1 a 200 Caracteres")

];


module.exports = validationsProducts;