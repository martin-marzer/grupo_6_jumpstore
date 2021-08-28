const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const ImagesFolderPath = path.join(__dirname, '../../public/images/zapatillas/');

const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

let resultHandler = function(err) { 
    if(err) {
       console.log("unlink failed", err);
    } else {
       console.log("file deleted");
    }
}

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controlador = {
    administrator: (req,res) => {
        res.render("administrator");
    },
    administratorTools: (req,res) => {
        res.render("administratorToolsProducts", {
            articulos: products,
            toThousand: toThousand
        });
    },
    productCreate: (req,res) => {
        res.render("productCreate");
    },
    store: (req,res) => {
        
       let newId = products[products.length -1].id;
       let id = newId +1;

       let newProduct = {
           id: id,
           name:  req.body.name,
           price: req.body.precio,
           talle: req.body.talle,
           brand: req.body.marca,
           image: [req.files[0].filename, req.files[1].filename, req.files[2].filename],
           date: req.body.fechaEntrada,
           description: req.body.descripcion,
           
       }

       newProduct.name = newProduct.name.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
       newProduct.description = newProduct.description.charAt(0).toUpperCase() + newProduct.description.slice(1);
       newProduct.price = parseInt(newProduct.price, 10)
       

       let newBasedata = products.concat(newProduct)
       let finalProduct = JSON.stringify(newBasedata, null, 2)

       fs.writeFileSync(productsFilePath, finalProduct)  

       console.log(req.file)

		res.redirect("/administratorToolsProducts");
    },
    productEdit: (req,res) => {
        let idZapatilla = req.params.id;
        let productId;
        products.forEach(producto => {
            if (producto.id == idZapatilla) {
                productId = producto;
            }
        }); 
        res.render("productEdit", {
            articulo: productId
        });
    },
    update: (req,res) => {
        productToEditBody= req.body;
		let idProduct = req.params.id - 1;
        let product = products[idProduct];

        product.name =  productToEditBody.name;
        product.price = productToEditBody.price;
        product.talle =  productToEditBody.talle;
        product.brand = productToEditBody.brand;
        // product.image = [req.files[0].filename, req.files[1].filename, req.files[2].filename]
        product.date = productToEditBody.date;
        product.description = productToEditBody.description;
                   
        product.price = parseInt(product.price, 10)
        product.name =  product.name.charAt(0).toUpperCase() +  product.name.slice(1);
        product.description = product.description.charAt(0).toUpperCase() +  product.description.slice(1);

        products[product] = product;

        let newBasedata = products.concat(product)
        let finalProduct = JSON.stringify(newBasedata, null, 2)

        fs.writeFileSync(productsFilePath, finalProduct)

        console.log(product)
        res.redirect("/administratorToolsProducts");
    }, 
    delete: (req,res) => {

    }
};

module.exports = controlador;