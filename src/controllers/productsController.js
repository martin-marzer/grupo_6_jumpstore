const fs = require('fs');
const path = require('path');

const articulosFilePath = path.join(__dirname, '../data/productosDataBase.json');
const articulos = JSON.parse(fs.readFileSync(articulosFilePath, 'utf-8'));


const controlador = {
    productsList: (req,res) => {
        res.render("listProducts", {
            articulos: articulos
        });
    },
    productDetail: (req,res) => {
        let idZapatilla = req.params.id;
        let articuloId = articulos[idZapatilla - 1];
        if(articulos.indexOf(articuloId) != -1){
            res.render("detailProducts", {
                articuloId: articuloId
            });
        } else {
            res.send("te re hackee por poner numero incorrecto")
          }
    }
};

module.exports = controlador;