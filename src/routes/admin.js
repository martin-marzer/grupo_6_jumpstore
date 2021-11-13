const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const path = require("path");
const multer = require("multer");
const { body } = require("express-validator")

const multerStorage = multer.diskStorage({
    destination:  (req, file, cb) => {
      cb(null, path.join(__dirname, "../../public/images/zapatillas"));
    },
    filename: (req, file, cb) => {
        const newFilename = "product" + '-' + Date.now() + path.extname(file.originalname);
      cb(null, newFilename);
    }
  })

  const upload = multer({
    storage: multerStorage,
    fileFilter: function (req, file, callback) {
        let ext = path.extname(file.originalname);
        //aca se especifica los archivos q admite
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
            return callback(new Error('solo imagenes pa'))
        }
        callback(null, true)
    },
    //aca se especifica los limites, se aceptan aprox 2MB each foto, and only 3 files sino no se sube
    limits:{
        fileSize: 1424 * 1424,
        files: 3
    }
});



const validations = [
  body("name")
  .notEmpty().withMessage("Escribe un Nombre").bail()
  .isLength({min:5, max:100}).withMessage("Longitud: 5 a 100 Caracteres"),

  body("precio")
  .notEmpty().withMessage("Escribe el precio").bail()
  .isInt().withMessage("solo números"),

  body("descripcion")
  .notEmpty().withMessage("Escribe la descripcion").bail()
  .isLength({min:1, max:200}).withMessage("Longitud: 1 a 200 Caracteres"),,

  body("marca")
  .notEmpty().withMessage("Elige la marca").bail()
  .isInt().withMessage(),

  body("descuento")
  .notEmpty().withMessage("Escribe el descuento").bail()
  .isInt().withMessage("solo números"),

  body("fechaEntrada")
  .notEmpty().withMessage("No puede estar vacío").bail()
  .isDate().withMessage("Elige una fecha"),

  body("stock")
  .notEmpty().withMessage("Escribe el descuento").bail()
  .isInt().withMessage("solo números")
];

// console.log(validations);
// router.get("/holi", adminMiddleware, adminController.nose);

/*** GET ADMINISTRATOR ***/  
router.get("/", adminController.administrator);

/*** GET TODOS LOS PRODUCTOS COMO ADMIN ***/  
router.get("/products", adminController.allProducts)

/*** CREATE ONE PRDUCT ***/  
router.get("/products/create", adminController.productCreate)
router.post('/products', upload.array("myFile"), adminController.store); 

/*** EDIT ONE PRDUCT ***/  
router.get("/products/edit/:id", adminController.productEdit)
router.put('/products/edit/:id', adminController.update);

// /*** DELETE ONE PRODUCT***/ 
router.delete('/products/delete/:id', adminController.delete); 

/*** GET ALL USERS AS ADMIN ***/  
router.get("/users", adminController.allUsers)

/*** EDIT ONE USER ***/  
router.get("/users/edit/:id", adminController.userEdit)
router.put('/users/edit/:id', adminController.userUpdate);

module.exports = router;