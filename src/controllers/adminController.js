const fs = require('fs');
const path = require('path');

const ImagesFolderPath = path.join(__dirname, '../../public/images/zapatillas/');
let db = require("../database/models");

const Product = db.Product;
const ImagesProduct = db.ImagesProduct;
const SizesProduct = db.SizesProduct;
const User = db.User;

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controlador = {
    administrator: (req,res) => {
        let promProducts = Product.findAll()
        let promUsers = User.findAll()
        Promise
        .all(([promProducts, promUsers]))
        .then(([products, users]) => {
            res.render("administrator", {
                articulos: products,
                usuarios: users,
                user: req.session.userLogged
            });
        })
    },
    administratorTools: (req,res) => {
        Product.findAll({
                include: ["images"]
        })
        .then(articulos => {
            res.render("administratorToolsProducts", {
                articulos: articulos,
                toThousand: toThousand
        })});
    },
    productCreate: (req,res) => {
        res.render('productCreate');
    },
    store: (req,res) => {
        let images = [req.files[0].filename, req.files[1].filename, req.files[2].filename]

        Product.create({
            name: req.body.name,
            price: req.body.precio,
            description: req.body.descripcion,
            brandID: req.body.marca,
            discountID: 1,
            createdAt: req.body.fechaEntrada,
            stockID: 1
        })
        .then (() => {
            Product.count({
                col: 'Product.id'
            })
            .then(count => {
                SizesProduct.create({
                    sizeID: req.body.talle,
                    productID: count
                })

                images.forEach(image => {
            
                    ImagesProduct.create({
                        url: image,
                        productsID: count
                    })
                    
                })
              })
        })
        .then(()=> {
            res.redirect('/administratorToolsProducts')
        })            
        .catch(error => res.send(error))
    },
    productEdit: (req,res) => {
        Product.findByPk(req.params.id, {
            include: ['images', "stocks", "brands","discounts", "sizes"]
        })
        .then(product => {
            res.render("productEdit", {
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
                brandID: req.body.marca,
                discountID: 1,
                createdAt: req.body.fechaEntrada,
                stockID: 1
            },
            {
                where: {id: productId}
            })
        .then(()=> {
            res.redirect('/administratorToolsProducts')})            
        .catch(error => res.send(error))
    }, 
    delete: (req,res) => {

        let promDestroySizes = SizesProduct.destroy ({
            where: {
                sizeID: 2 ,
                productID: req.params.id
            }
        })

        let promDestroyProducts = Product.destroy( {
            where: {id: req.params.id}, force: true}) // force: true es para asegurar que se ejecute la acción

        let promDestroyImages = ImagesProduct.destroy( {
            where: {productsID: req.params.id}, force: true})
        
        Promise.all([promDestroyProducts, promDestroyImages])
            .then(()=>{
                return res.redirect('/administratorToolsProducts')})
            .catch(error => res.send(error)) 
    },
    administratorUsers: (req,res) => {
        res.send("aca iria para ver los perfiles, podria editarse para cambiar su rol")
    }
};

module.exports = controlador;