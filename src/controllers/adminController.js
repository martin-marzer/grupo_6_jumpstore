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
            articulos: articulos
        });
    },
    store: (req,res) => {
        
       let newId = articulos[articulos.length -1].id;
       let id = newId +1;

       let newProduct = {
           id: id,
           name:  req.body.name,
           talle: req.body.talle,
           description: req.body.descripcion,
           price: req.body.precio,
           marca: req.body.marca,
           image: [req.file.filename]
       }

       newProduct.name = newProduct.name.charAt(0).toUpperCase() + newProduct.name.slice(1);
       newProduct.description = newProduct.description.charAt(0).toUpperCase() + newProduct.description.slice(1);
       newProduct.price = parseInt(newProduct.price, 10)
       

       let newBasedata = articulos.concat(newProduct)
       let finalProduct = JSON.stringify(newBasedata, null, 2)

       fs.writeFileSync(articulosFilePath, finalProduct)  

       console.log(req.file)

		res.redirect("/administratorToolsProducts");
    },
    productEdit: (req,res) => {
        let articuloID = req.params.id - 1;
		res.render("productEdit", {
			articulo: articulos[articuloID]
		});
    },
    update: (req,res) => {
        res.render("productEdit")
    }
};

module.exports = controlador;