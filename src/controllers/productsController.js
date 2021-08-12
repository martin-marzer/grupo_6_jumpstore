



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
    })
};
module.exports = controlador;

