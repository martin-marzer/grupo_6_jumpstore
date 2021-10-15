const fs = require('fs');
const { each } = require('jquery');
const path = require('path');

const productsFilePath = path.resolve(__dirname, '../database/products.json');
const db = require("../database/models")
const Products = db.Product
const Op = db.Sequelize.Op

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const controlador = {
    productsList: (req,res) => {
        let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        let url = req.originalUrl.split("/")
        let viewToRender;
        if (url.includes("sneakers")) {
            viewToRender = "listProducts"
        } else {
            viewToRender = "ofertas"
            products = products.filter(product => {
                if (product.discount != 0) {
                    return product
                }
            })
        }

        //esto ordena la vaina, obtiene el dato desde el link y de ahi se acomoda la vista

        let order = req.params.OrderBy;
        let orderFunc = () => {
            
            switch (order) {
                case "OrderByReleaseDateASC":
                    products.sort(function(a, b) {  
                        return a.id - b.id ;  
                    }); 
                    break;

                case "OrderByReleaseDateDESC":
                    products.sort(function(a, b) {  
                        return  b.id - a.id ;  
                    }); 
                break;

                case "OrderByPriceASC":
                    products.sort(function(a, b) {  
                        return a.price - b.price ;  
                    }); 
                    break;

                case "OrderByPriceDESC":
                    products.sort(function(a, b) {  
                        return b.price - a.price ;  
                    }); 
                break;
            }
        }


        let filterData =  req.params.FilterBy
        let filterFunc = () => {
            let filterFinal = [];
            if (filterData != undefined) {
                filterProcess = filterData.split("+")
                for (let i = 0; i < filterProcess.length; i++) {
                    const element = filterProcess[i];
                    filterFinal.push(element)
                }
                let productsFilterFinal = [];
                // categoriaFIltrosOrden: marcas, talles, precio
                let categoriaFiltros = [
                    [],
                    [],
                    []
                ]
                
                for (let i = 0; i < filterFinal.length; i++) {
                    const eachFilter = filterFinal[i]
                    switch (eachFilter) {

                        case "adidas":
                        case "fila":
                        case "nike":
                        case "vans":
                            categoriaFiltros[0].push(eachFilter)
                            break;

                        case "35-40":
                        case "40-45":
                            categoriaFiltros[1].push(eachFilter)
                            break;
                        case "0$-19999$":
                        case "20000$-max":
                            categoriaFiltros[2].push(eachFilter)
                            break;
                        default:
                            break;
                    }
                }
                let brands = categoriaFiltros[0]
                let size = categoriaFiltros[1]
                let price = categoriaFiltros[2]

                let filterByMarca = []

                let filterByTalle = []

                let filterByPrecio = []

                brandFilter = () => {
                    for (let i = 0; i < brands.length; i++) {
                        const marca = brands[i];
                         products.filter(product => {
                        
                            if (product.brand == marca) {
                                filterByMarca.push(product)
                            }
                      } ) 
                    }
                    products = filterByMarca
                }
                
                sizeFilter = () => {
                    for (let i = 0; i < size.length; i++) {
                        const talle = size[i];
                        products.filter(product => {
                        
                            if (product.talle == talle) {
                                filterByTalle.push(product) 
                            } 
                      } ) 
                    }
                    products = filterByTalle
                }
                priceFilter = () => {
                    for (let i = 0; i < price.length; i++) {
                        const precio = price[i];
                        products.filter(product => {
                            
                            if (precio == "0$-19999$") {                               
                                if (product.priceFinal >= 0 && product.priceFinal <= 19999) {
                                    filterByPrecio.push(product) 
                                } 
                            }
                            if (precio == "20000$-max") {                               
                                if (product.priceFinal >= 20000 && product.priceFinal <= 200_000) {
                                    filterByPrecio.push(product) 
                                } 
                            }  
                            
                      } ) 
                    }
                    products = filterByPrecio
                }


                switch (true) {

                    // si  todas las categorias estan seleccionadas
                    case brands.length != 0 && size.length != 0 && price.length != 0 :
                        brandFilter()
                        sizeFilter()
                        priceFilter()
                        break;

                    // si hay hay 2 categorias seleccionadas

                    case brands.length != 0 && size.length != 0 && price.length == 0 :
                        brandFilter()
                        sizeFilter()
                        break;

                    case brands.length != 0 && size.length == 0 && price.length != 0 :
                        brandFilter()
                        priceFilter()
                        break;

                    case brands.length == 0 && size.length != 0 && price.length != 0 :
                        sizeFilter()
                        priceFilter()
                        break;

                    // si solo hay una categoria seleccionada

                    case brands.length != 0 && size.length == 0 && price.length == 0 :
                        brandFilter()
                        break;

                    case brands.length == 0 && size.length != 0 && price.length == 0 :
                        sizeFilter()
                        break;

                    case brands.length == 0 && size.length == 0 && price.length != 0 :
                        priceFilter()
                        break;

                    default:
                        break;
                }
                productsFilterFinal = products

            res.render(viewToRender, {
                articulos: productsFilterFinal,
                order: order,
                filter: filterFinal,
                toThousand: toThousand
                })
            } else {
                res.render(viewToRender, {
                    articulos: products,
                    order: order,
                    filter: filterFinal,
                    toThousand: toThousand
                });
            }
        }
        orderFunc();
        filterFunc();
        
    },
    productDetail: (req,res) => {
        let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        let idZapatilla = req.params.id;
        let articuloId;
        products.forEach(producto => {
            if (producto.id == idZapatilla) {
                articuloId = producto;
            }
            
        }); 

        if(products.indexOf(articuloId) != -1){
            res.render("detailProducts", {
                articulos: products,
                articuloId: articuloId,
                toThousand: toThousand
            });
        } else {
            res.render("error")
          }
    },
    prueba: (req, res) => {
        let orderParams = req.params.OrderBy;
        let filterData =  req.params.FilterBy

        Products.findAll({
            include: ['images', "stocks", "brands","discounts", "sizes"]
        })
            .then(allProducts => {

                let orderFunc = () => {
            
                    switch (orderParams) {
                        case "OrderByReleaseDateASC":
                            allProducts.sort(function(a, b) {  
                                return a.id - b.id ;  
                            }); 
                            break;
        
                        case "OrderByReleaseDateDESC":
                            allProducts.sort(function(a, b) {  
                                return  b.id - a.id ;  
                            }); 
                        break;
        
                        case "OrderByPriceASC":
                            allProducts.sort(function(a, b) {  
                                return a.price - b.price ;  
                            }); 
                            break;
        
                        case "OrderByPriceDESC":
                            allProducts.sort(function(a, b) {  
                                return b.price - a.price ;  
                            }); 
                        break;
                    }
                }

                let filterFunc = () => {
                    let filterFinal = [];
                    if (filterData != undefined) {
                        filterProcess = filterData.split("+")
                        for (let i = 0; i < filterProcess.length; i++) {
                            const element = filterProcess[i];
                            filterFinal.push(element)
                        }
                        let productsFilterFinal = [];
                        // categoriaFIltrosOrden: marcas, talles, precio
                        let categoriaFiltros = [
                            [],
                            [],
                            []
                        ]
                        
                        for (let i = 0; i < filterFinal.length; i++) {
                            const eachFilter = filterFinal[i]
                            switch (eachFilter) {
        
                                case "adidas":
                                case "fila":
                                case "nike":
                                case "vans":
                                    categoriaFiltros[0].push(eachFilter)
                                    break;
        
                                case "35-40":
                                case "40-45":
                                    categoriaFiltros[1].push(eachFilter)
                                    break;
                                case "0$-19999$":
                                case "20000$-max":
                                    categoriaFiltros[2].push(eachFilter)
                                    break;
                                default:
                                    break;
                            }
                        }
                        let brands = categoriaFiltros[0]
                        let size = categoriaFiltros[1]
                        let price = categoriaFiltros[2]
        
                        let filterByMarca = []
        
                        let filterByTalle = []
        
                        let filterByPrecio = []
        
                        brandFilter = () => {
                            for (let i = 0; i < brands.length; i++) {
                                const marca = brands[i];
                                 allProducts.filter(product => {
                                
                                    if (product.brands.name == marca) {
                                        filterByMarca.push(product)
                                    }
                              } ) 
                            }
                            allProducts = filterByMarca
                        }
                        
                        sizeFilter = () => {
                            for (let i = 0; i < size.length; i++) {
                                const talle = size[i];
                                allProducts.filter(product => {
                                
                                    if (product.sizes[0].name == talle) {
                                        filterByTalle.push(product) 
                                    } 
                              } ) 
                            }
                            allProducts = filterByTalle
                        }
                        priceFilter = () => {
                            for (let i = 0; i < price.length; i++) {
                                const precio = price[i];
                                allProducts.filter(product => {
                                    
                                    priceOFF = product.price - (product.price * product.discounts.discountPercent / 100)
                                    
                                    if (precio == "0$-19999$") {
                                                               
                                        if (priceOFF >= 0 && priceOFF <= 19999) {
                                            filterByPrecio.push(product) 
                                        } 
                                    }
                                    if (precio == "20000$-max") {                               
                                        if (priceOFF >= 20000 && priceOFF <= 200_000) {
                                            filterByPrecio.push(product) 
                                        } 
                                    }  
                                    
                              } ) 
                            }
                            allProducts = filterByPrecio
                        }
        
        
                        switch (true) {
        
                            // si  todas las categorias estan seleccionadas
                            case brands.length != 0 && size.length != 0 && price.length != 0 :
                                brandFilter()
                                sizeFilter()
                                priceFilter()
                                break;
        
                            // si hay hay 2 categorias seleccionadas
        
                            case brands.length != 0 && size.length != 0 && price.length == 0 :
                                brandFilter()
                                sizeFilter()
                                break;
        
                            case brands.length != 0 && size.length == 0 && price.length != 0 :
                                brandFilter()
                                priceFilter()
                                break;
        
                            case brands.length == 0 && size.length != 0 && price.length != 0 :
                                sizeFilter()
                                priceFilter()
                                break;
        
                            // si solo hay una categoria seleccionada
        
                            case brands.length != 0 && size.length == 0 && price.length == 0 :
                                brandFilter()
                                break;
        
                            case brands.length == 0 && size.length != 0 && price.length == 0 :
                                sizeFilter()
                                break;
        
                            case brands.length == 0 && size.length == 0 && price.length != 0 :
                                priceFilter()
                                break;
        
                            default:
                                break;
                        }
                        productsFilterFinal = allProducts
        
                    res.render("prueba", {
                        articulos: productsFilterFinal,
                        order: orderParams,
                        filter: filterFinal,
                        toThousand: toThousand
                        })
                    } else {
                        res.render("prueba", {
                            articulos: allProducts,
                            order: orderParams,
                            filter: filterFinal,
                            toThousand: toThousand
                        });
                    }
                }
                orderFunc()
                filterFunc()
                })
                .catch(error => res.send(error))
    },
    pruebaDetail: (req,res) => {
        let idProduct = req.params.id
        Products.findByPk(idProduct,
            {
                include: ['images', "stocks", "brands","discounts"]
            })
            .then(product => {
                res.render('pruebaDetail', {
                    articuloID: product,
                    toThousand: toThousand
                });
            });
    }
};

module.exports = controlador;



