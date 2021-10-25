const fs = require('fs');
const path = require('path');

const productsFilePath = path.resolve(__dirname, '../database/products.json');
const ImagesFolderPath = path.join(__dirname, '../../public/images/zapatillas/');
const usersFilePath = path.resolve(__dirname, '../database/users.json');

let db = require("../database/models");

const Product = db.Product;
const ImagesProduct = db.ImagesProduct;
const User = db.User;


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
       Product.findAll()
                .then(articulos => {
                    return  res.render("administrator", {
                        articulos: articulos,
                        usuarios: User,
                        user: req.session.userLogged
                    });
                })
    },
    administratorTools: (req,res) => {
        Product.findAll({
                include: ["images"]
        })
        .then(articulos => {
            return res.render("administratorToolsProducts", {
                articulos: articulos,
                toThousand: toThousand
        })});
    },
    productCreate: (req,res) => {
        Product.findAll()
            .then(articulos => {
                return res.render('productCreate', { articulos, errors: {} });
            })
    },
    store: (req,res) => {
        Product.create({
            name: req.body.name,
            price: req.body.precio,
            description: req.body.descripcion,
            brandID: 1,
            discountID: 1,
            createdAt: req.body.fechaEntrada,
            stockID: 1
        })
        .then(() =>{
            let imagenes = [req.files[0].filename, req.files[1].filename, req.files[2].filename]
            console.log(req.files[1].filename)
            for (let i = 0; i < imagenes.length; i++) {
                const imagen = imagenes[i];
                ImagesProduct.create({
                    url: imagen,
                    productsID: Products.length + 1
            })
            
        }
        })
        .then(()=> {
            return res.redirect('/administratorToolsProducts')})            
        .catch(error => res.send(error))
    },
    productEdit: (req,res) => {
        Product.findByPk(req.params.id, {
            include: ['images', "stocks", "brands","discounts", "sizes"]
        })
        .then(product => {
            return res.render("productEdit", {
                articulo: product,
                toThousand: toThousand
            });
        })
        .catch(error => res.send(error))
    },
    update: (req,res) => {
        let productId = req.params.id;
        Product
        .update(
            {
                name: req.body.name,
                price: req.body.precio,
                description: req.body.descripcion,
                brandID: 1,
                discountID: 1,
                createdAt: req.body.fechaEntrada,
                stockID: 1
            },
            {
                where: {id: productId}
            })
        .then(()=> {
            return res.redirect('/administratorToolsProducts')})            
        .catch(error => res.send(error))
    }, 
    delete: (req,res) => {
        let productId = req.params.id;
        let promDestroy = Product.destroy( {
            where: {id: parseInt(productId)}, force: true}) // force: true es para asegurar que se ejecute la acción

        let promDestroyImages = ImagesProduct.destroy( {
            where: {productsID: parseInt(productId)}, force: true})
        
        Promise.all([promDestroy, promDestroyImages])
            .then(()=>{
                return res.redirect('/administratorToolsProducts')})
            .catch(error => res.send(error)) 
    },
    administratorUsers: (req,res) => {
        res.send("aca iria para ver los perfiles, podria editarse para cambiar su rol")
    }
};

module.exports = controlador;