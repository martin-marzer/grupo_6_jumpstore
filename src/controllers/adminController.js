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
            discount: req.body.descuento,
            createdAt: req.body.fechaEntrada,
            updatedAt: null,
            quantity: req.body.stock
        })
        .then (() => {
            Product.count({
                col: 'Product.id'
            })
            .then(count => {
                images.forEach(image => {
        
                    ImagesProduct.create({
                        url: image,
                        productsID: count
                    })
                
                })
                console.log(count);
                SizesProduct.create({
                    sizeID: req.body.talle,
                    productID: count
                })
                .then(()=> {
                    res.redirect('/administratorToolsProducts')
                })   
            })
   
        })    
        .catch(error => res.send(error))
    },
    productEdit: (req,res) => {
        Product.findByPk(req.params.id, {
            include: ['images', "brands", "sizes"]
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
                discount: req.body.descuento,
                createdAt: req.body.fechaEntrada,
                quantity: req.body.stock
            },
            {
                where: {id: productId}
            })
        .then(()=> {
            res.redirect('/administratorToolsProducts')
        })            
        .catch(error => res.send(error))
    }, 
    delete: (req,res) => {

        ImagesProduct.findAll ({
            where: {
                productsID: req.params.id
            }
        })
        .then((images)=> {
            let arrIMG = [images[0].url, images[1].url, images[2].url]
            arrIMG.forEach(image => {
                fs.unlinkSync(ImagesFolderPath + image)
            })
        })
        .then(() => {
            ImagesProduct.destroy( {
                where: {
                    productsID: req.params.id
                }, force: true
            })
            .then(() => {
                SizesProduct.destroy( {
                    where: {
                        productID: req.params.id,
                        sizeID: req.body.talle
                    }, force: true
                })
                .then(() => {
                    Product.destroy( {
                        where: {
                            id: req.params.id
                        }, force: true
                    })
                    // .then(()=>{
                        
                    //     Product.count({
                    //         col: "Product.id"
                    //     })
                    //     .then(count => {
                    //         for (let i = 1; i <= count; i++) {
                    //             Product.findByPk(i)
                    //             .then(producto => {
                    //                 if (producto == undefined) {
                    //                     Product.update(
                    //                         { id: i},
                    //                         { where: {id: i + 1} }
                    //                     )
                    //                 }
                                    
                    //             })
                               
                    //         }
                    //     })
    
    
                    // })
                    .then(() => {
                        res.redirect('/administratorToolsProducts')
                    })
                })


            })
        })

        
        .catch(error => res.send(error)) 
    },
    administratorUsers: (req,res) => {
        res.send("aca iria para ver los perfiles, podria editarse para cambiar su rol")
    },
    // nose: (req, res) => {
    //     Product.count({
    //         col: 'Product.id'
    //     })
    //     .then(count => {
    //         let idk = [];

    //         for (let i = 1; i <= count; i++) {
    //             const eachwacho = i;
    //             idk.push(eachwacho)
    //             Product.findByPk(i)
    //             .then(producto => {
    //                 if (producto == undefined) {
    //                     Product
    //                     .update(
    //                         {
    //                             id: id - 1
    //                         },
    //                         {
    //                             where: {id: i + 1}
    //                         })
    //                 } 
    //             })

    //             // Product
    //             // .update(
    //             //     {
    //             //         id: i
    //             //     },
    //             //     {
    //             //         where: {id: i}
    //             //     })
            
    //             // console.log( eachwacho);
    //         }

    //         //  let hola = Array.from(Array(count).keys()).map(e => {
    //         //      return e + 1
    //         //  })
    //         // console.log(hola);
            
    //         res.json(idk)
    //     })

    // }
};

module.exports = controlador;