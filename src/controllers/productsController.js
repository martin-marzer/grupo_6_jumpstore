const fs = require('fs');
const path = require('path');

const articulosFilePath = path.join(__dirname, '../data/productosDataBase.json');
const articulosDelJson = JSON.parse(fs.readFileSync(articulosFilePath, 'utf-8'));
const articulos = [].concat(articulosDelJson);


const controlador = {
    productsList: (req,res) => {
        res.render("listProducts", {
            articulos: articulos
        });
    },
    productDetail: ('/products/detail/:id', (req,res) => {
        let idZapatilla = req.params.id;
        let articuloId = articulos[idZapatilla - 1];
        if(articulos.indexOf(articuloId) != -1){
            res.render("detailProducts", {
                articuloId: articuloId
            });
        } else {
            res.send("te re hackee por poner numero incorrecto")
          }
    }),
    administratorTools: (req,res) => {
        res.render("administratorToolsProducts", {
            articulos: articulos
        });
    },
};
module.exports = controlador;

