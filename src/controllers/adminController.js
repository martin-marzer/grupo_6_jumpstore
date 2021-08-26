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
       }

       let newBasedata = articulos.concat(newProduct)
       let finalProduct = JSON.stringify(newBasedata, null, 2)
2
       fs.writeFileSync(articulosFilePath, finalProduct)  

       console.log(finalProduct )

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