// const fs = require('fs');
// const path = require('path');

// const articulosFilePath = path.join(__dirname, '../data/productosDataBase.json');
// const articulosDelJson = JSON.parse(fs.readFileSync(articulosFilePath, 'utf-8'));
// const articulos = [].concat(articulosDelJson);

let articulos = [
    {nombre: "ZAPATILLA FILA TREND 2.0", precio: "$6.790,00", img: ["/images/zapatillas/Fila 1.jpg", "/images/zapatillas/Fila 2.jpg", "/images/zapatillas/Fila 3.jpg"], descrip:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis placeat, dicta corporis in, porro incidunt aperiam eius maiores natus ad veritatis nihil provident enim nulla nemo optio. Placeat, ipsum incidunt."},
    {nombre: "zapatilla epicarda '99", precio: "$2.790,00", img: ["/images/zapatillas/jorda-jbalbin.jpeg",
    "/images/zapatillas/adidas-mas-vendidas.jpg", "/images/zapatillas/nike-mas-vendido.jpg"], descrip:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis placeat, dicta corporis in, porro incidunt aperiam eius maiores natus ad veritatis nihil provident enim nulla nemo optio. Placeat, ipsum incidunt."},
    {nombre: "ZAPATILLA FILA TREND 2.0", precio: "$6.790,00", img: ["/images/zapatillas/Fila 1.jpg", "/images/zapatillas/Fila 2.jpg", "/images/zapatillas/Fila 3.jpg"], descrip:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis placeat, dicta corporis in, porro incidunt aperiam eius maiores natus ad veritatis nihil provident enim nulla nemo optio. Placeat, ipsum incidunt."},
    {nombre: "zapatilla epicarda '99", precio: "$2.790,00", img: ["/images/zapatillas/adidas-mas-vendidas.jpg", "/images/zapatillas/jorda-jbalbin.jpeg", "/images/zapatillas/nike-mas-vendido.jpg"], descrip:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis placeat, dicta corporis in, porro incidunt aperiam eius maiores natus ad veritatis nihil provident enim nulla nemo optio. Placeat, ipsum incidunt."},
    {nombre: "ZAPATILLA FILA TREND 2.0", precio: "$6.790,00", img: ["/images/zapatillas/Fila 1.jpg", "/images/zapatillas/Fila 2.jpg", "/images/zapatillas/Fila 3.jpg"], descrip:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis placeat, dicta corporis in, porro incidunt aperiam eius maiores natus ad veritatis nihil provident enim nulla nemo optio. Placeat, ipsum incidunt."},
    {nombre: "zapatilla epicarda '99", precio: "$2.790,00", img: ["/images/zapatillas/nike-mas-vendido.jpg", "/images/zapatillas/adidas-mas-vendidas.jpg", "/images/zapatillas/jorda-jbalbin.jpeg"], descrip:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis placeat, dicta corporis in, porro incidunt aperiam eius maiores natus ad veritatis nihil provident enim nulla nemo optio. Placeat, ipsum incidunt."},
    {nombre: "ZAPATILLA FILA TREND 2.0", precio: "$6.790,00", img: ["/images/zapatillas/Fila 1.jpg", "/images/zapatillas/Fila 2.jpg", "/images/zapatillas/Fila 3.jpg"], descrip:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis placeat, dicta corporis in, porro incidunt aperiam eius maiores natus ad veritatis nihil provident enim nulla nemo optio. Placeat, ipsum incidunt."},
    {nombre: "zapatilla epicarda '99", precio: "$2.790,00", img: ["/images/zapatillas/jorda-jbalbin.jpeg",
    "/images/zapatillas/adidas-mas-vendidas.jpg", "/images/zapatillas/nike-mas-vendido.jpg"], descrip:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis placeat, dicta corporis in, porro incidunt aperiam eius maiores natus ad veritatis nihil provident enim nulla nemo optio. Placeat, ipsum incidunt."},
    {nombre: "ZAPATILLA FILA TREND 2.0", precio: "$6.790,00", img: ["/images/zapatillas/Fila 1.jpg", "/images/zapatillas/Fila 2.jpg", "/images/zapatillas/Fila 3.jpg"], descrip:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis placeat, dicta corporis in, porro incidunt aperiam eius maiores natus ad veritatis nihil provident enim nulla nemo optio. Placeat, ipsum incidunt."},
    {nombre: "zapatilla epicarda '99", precio: "$2.790,00", img: ["/images/zapatillas/adidas-mas-vendidas.jpg", "/images/zapatillas/jorda-jbalbin.jpeg", "/images/zapatillas/nike-mas-vendido.jpg"], descrip:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis placeat, dicta corporis in, porro incidunt aperiam eius maiores natus ad veritatis nihil provident enim nulla nemo optio. Placeat, ipsum incidunt."},
    {nombre: "ZAPATILLA FILA TREND 2.0", precio: "$6.790,00", img: ["/images/zapatillas/Fila 1.jpg", "/images/zapatillas/Fila 2.jpg", "/images/zapatillas/Fila 3.jpg"], descrip:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis placeat, dicta corporis in, porro incidunt aperiam eius maiores natus ad veritatis nihil provident enim nulla nemo optio. Placeat, ipsum incidunt."},
    {nombre: "zapatilla epicarda '99", precio: "$2.790,00", img: ["/images/zapatillas/nike-mas-vendido.jpg", "/images/zapatillas/adidas-mas-vendidas.jpg", "/images/zapatillas/jorda-jbalbin.jpeg"], descrip:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis placeat, dicta corporis in, porro incidunt aperiam eius maiores natus ad veritatis nihil provident enim nulla nemo optio. Placeat, ipsum incidunt."},

]


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

