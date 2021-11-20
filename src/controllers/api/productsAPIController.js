const db = require('../../database/models');

const Products = db.Product

const controller = {
    list: (req, res) => {
        Products.findAll({ include: ['images', "brands", "sizes"]})
        .then(products => {
            let respuesta = {
                meta: {
                    status : 200,
                    url: '/api/products'
                },
                count:  products.length,
                countByCategory: {
                    adidas: products.filter(product => product.brandID == 1).length ,
                    fila:products.filter(product => product.brandID == 2).length,
                    nike: products.filter(product => product.brandID == 3).length,
                    vans: products.filter(product => product.brandID == 4).length
                },
                products: products.map(product => {
                    product.dataValues.detail = `/api/products/${product.id}`
                    return product
                })
            }
                res.json(respuesta);
            })
    },
    detail: (req, res) => {
        Products.findByPk(req.params.id, { include: ['images', "brands", "sizes"]})
        .then(product => {
            product.images.forEach(image => {
                image.dataValues.url = `/images/zapatillas/${image.dataValues.url}` 
            })
            // console.log(product.images)
            let respuesta = {
                meta: {
                    status: 200,
                    url: `/api/products/${req.params.id}`,
                    oldURL: '/api/products'
                },
                data: product
            }
            res.json(respuesta);
        });
    }
}

module.exports = controller;