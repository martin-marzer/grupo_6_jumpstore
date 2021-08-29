const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const controlador = {
    productsList: (req,res) => {
        //esto ordena la vaina, obtiene el dato desde el link y de ahi se acomoda la vista
        let order = req.params.OrderBy;
        if (order == undefined ) {
            products.sort(function(a, b) {  
                return a.id - b.id ;  
            }); 
        }
        else if (order == "OrderByReleaseDateASC" ) {
            products.sort(function(a, b) {  
                return  b.id - a.id ;  
            }); 
        }
        else if (order == "OrderByPriceASC") {
            products.sort(function(a, b) {  
                return a.price - b.price ;  
            }); 
        }
        else if (order == "OrderByPriceDESC") {
            products.sort(function(a, b) {  
                return b.price - a.price ;  
            }); 
        }
        res.render("listProducts", {
            articulos: products,
            order: order,
            toThousand: toThousand
        });
    },
    productDetail: (req,res) => {
        let idZapatilla = req.params.id;
        let articuloId;
        products.forEach(producto => {
            if (producto.id == idZapatilla) {
                articuloId = producto;
            }
        }); 

        if(products.indexOf(articuloId) != -1){
            res.render("detailProducts", {
                articuloId: articuloId,
                toThousand: toThousand
            });
        } else {
            res.render("error")
          }
    }
};

module.exports = controlador;