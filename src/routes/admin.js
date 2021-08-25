const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const path = require("path");
const multer = require("multer");

const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = path.join(__dirname, "../../public/images/products");
      cb(null, folder);
    },
    filename: function (req, file, cb) {
        let imageName = "product" + '-' + Date.now() + path.extname(file.originalname);
      cb(null, imageName);
    }
  })

  const upload = multer({
      error: function(req,file,cb){
          let formato = path.extname(file.originalname);
          if(formato != ".png" && formato != ".jpeg"){
             throw Error("Solo imagenes")
          }
      }
  })

/*** GET ADMINISTRATOR ***/  
router.get("/administrator", adminController.administrator);

/*** GET TODOS LOS PRODUCTOS COMO ADMIN ***/  
router.get("/administratorToolsProducts", adminController.administratorTools)

/*** CREATE ONE PRDUCT ***/  
router.get("/productCreate", adminController.productCreate)
router.post('/products', upload.array("img-product"), adminController.store);

/*** EDIT ONE PRDUCT ***/  
router.get("/productEdit", adminController.productEdit)
router.put('/products/edit/:id', adminController.update);

module.exports = router;