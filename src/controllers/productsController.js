const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const controlador = {
    productsList: (req,res) => {
        res.render("listProducts", {
            articulos: products,
            toThousand: toThousand
        });
    },
    productDetail: (req,res) => {
        let idZapatilla = req.params.id;
        let articuloId = products[idZapatilla - 1];
        if(products.indexOf(articuloId) != -1){
            res.render("detailProducts", {
                articuloId: articuloId,
                toThousand: toThousand
            });
        } else {
            res.send("te re hackee por poner numero incorrecto")
          }
    }
};

module.exports = controlador;