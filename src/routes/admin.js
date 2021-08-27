const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const path = require("path");
const multer = require("multer");

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
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('solo imagenes pa'))
        }
        callback(null, true)
    },
    limits:{
        fileSize: 1424 * 1424,
        files: 3
    }
});

/*** GET ADMINISTRATOR ***/  
router.get("/administrator", adminController.administrator);

/*** GET TODOS LOS PRODUCTOS COMO ADMIN ***/  
router.get("/administratorToolsProducts", adminController.administratorTools)

/*** CREATE ONE PRDUCT ***/  
router.get("/productCreate", adminController.productCreate)
router.post('/administratorToolsProducts', upload.array("myFile"), adminController.store); 

/*** EDIT ONE PRDUCT ***/  
router.get("/products/edit/:id", adminController.productEdit)
router.put('/products/edit/:id', adminController.update);

module.exports = router;