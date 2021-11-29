const express = require("express");
const router = express.Router();
const path = require("path");
const adminController = require("../controllers/adminController");

const validations = require('../middlewares/validationsProducts.js');


const ImagesFolderPath = path.join(__dirname, '../../public/images/zapatillas/');
const multer = require("multer");


const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../public/images/zapatillas'));
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
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
      return callback(new Error('solo imagenes pa'))
    }
    callback(null, true)
  },
  //aca se especifica los limites, se aceptan aprox 2MB each foto, and only 3 files sino no se sube
  limits: {
    fileSize: 1424 * 1424,
    files: 3
  }
});

function validUploadLength(req, res, next) {
  if (req.files.length !== 3) {
    // console.log(req.files);
    let images;
    if (req.files.length == 1) {
      images = req.files[0].filename
      fs.unlinkSync(ImagesFolderPath + images)
    }
    else if (req.files.length == 2) {
      images = [req.files[0].filename, , req.files[1].filename]
      images.forEach(image => {
        fs.unlinkSync(ImagesFolderPath + image)
      })
    }
    let e = new Error('Solo 3 imagenes')
    res.locals.imgERROR = e.toString()
  }
  next()
}




/*** GET ADMINISTRATOR ***/
router.get("/", adminController.administrator);

/*** GET TODOS LOS PRODUCTOS COMO ADMIN ***/
router.get("/products", adminController.allProducts)

/*** CREATE ONE PRDUCT ***/
router.get("/products/create", adminController.productCreate)
router.post('/products/create', upload.array("myFile", 3), validUploadLength, validations, adminController.store);

/*** EDIT ONE PRDUCT ***/
router.get("/products/edit/:id", adminController.productEdit)
router.put('/products/edit/:id', validations, adminController.update);

// /*** DELETE ONE PRODUCT***/ 
router.delete('/products/delete/:id', adminController.delete);

/*** GET ALL USERS AS ADMIN ***/
router.get("/users", adminController.allUsers)

/*** EDIT ONE USER ***/
router.get("/users/edit/:id", adminController.userEdit)
router.put('/users/edit/:id', adminController.userUpdate);


module.exports = router;