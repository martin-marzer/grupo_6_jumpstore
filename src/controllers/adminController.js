const fs = require('fs');
const path = require('path');

const articulosFilePath = path.join(__dirname, '../data/products.json');
const articulos = JSON.parse(fs.readFileSync(articulosFilePath, 'utf-8'));


const controlador = {
    administrator: (req,res) => {
        res.render("administrator");
    },
    administratorTools: (req,res) => {
        res.render("administratorToolsProducts", {
            articulos: articulos
        });
    },
    productCreate: (req,res) => {
        res.render("productCreate", {
        });
    },
    store: (req,res) => {
        
       let newId = articulos[articulos.length -1].id;
       let id = newId +1;

       let newProduct = {
           id: id,
           name:  req.body.name,
           talle: req.body.talle,
           descripcion: req.body.descripcion,
           precio: req.body.precio,
           marca: req.body.marca,
           imagen: req.file.filename
       }

       newProduct.name = newProduct.name.charAt(0).toUpperCase() + newProduct.name.slice(1);
       newProduct.descripcion = newProduct.descripcion.charAt(0).toUpperCase() + newProduct.descripcion.slice(1);
       newProduct.precio = parseInt(newProduct.precio, 10)
       

       let newBasedata = articulos.concat(newProduct)
       let finalProduct = JSON.stringify(newBasedata, null, 2)

       fs.writeFileSync(articulosFilePath, finalProduct)  

       console.log(req.file)

		res.redirect("/administratorToolsProducts");
    },
    productEdit: (req,res) => {
        res.render("productEdit", {
            articulos: articulos
        });
    },
    update: (req,res) => {
        res.render("productEdit")
    }
};

module.exports = controlador;