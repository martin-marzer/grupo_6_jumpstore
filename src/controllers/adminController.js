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
    productEdit: (req,res) => {
        res.render("productEdit", {
            articulos: articulos
        });
    }
};

module.exports = controlador;