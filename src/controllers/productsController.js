const fs = require('fs');
const { each } = require('jquery');
const path = require('path');

const productsFilePath = path.resolve(__dirname, '../database/products.json');


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const controlador = {
    productsList: (req,res) => {
        let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


        //esto ordena la vaina, obtiene el dato desde el link y de ahi se acomoda la vista

        let order = req.params.OrderBy;
        let orderFunc = () => {
            
            if (order == "OrderByReleaseDateDESC" ) {
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
        }


        let filterData =  req.params.FilterBy
        let filterFunc = () => {
            let filterFinal = [];
            if (filterData != undefined) {
                filterProcess = filterData.split("+")
                for (let i = 0; i < filterProcess.length; i++) {
                    const element = filterProcess[i];
                    filterFinal.push(element)
                    // console.log(filterFinal)
                }
                
                let productsFilterFinal = [];
                let filteredProducts;
                let categoriaFiltros = [
                    [],
                    []
                ]
                
                for (let i = 0; i < filterFinal.length; i++) {
                    const eachFilter = filterFinal[i]
                        // 'adidas', 'fila', 'nike', 'vans'  '35-37', '38-40', '41-43', '44-45'    '$5000-$14999', '$15000-max'
                    if (eachFilter == "adidas" || eachFilter == "fila" || eachFilter == "nike" || eachFilter == "vans") {
                       categoriaFiltros[0].push(eachFilter)
                    }
                    else if (eachFilter ==  "35-37" || eachFilter ==  "38-40" || eachFilter ==  "41-43" || eachFilter ==  "44-45") {
                        categoriaFiltros[1].push(eachFilter)
                    }
                }
                if  ( (categoriaFiltros[0].length != 0 && categoriaFiltros[1].length != 0) ) {
                    let allMarcas = categoriaFiltros[0]
                    let filterByMarca = []
                    for (let i = 0; i < allMarcas.length; i++) {
                        const marca = allMarcas[i];
                        products.map(product => {
                        
                            if (product.brand == marca) {
                              filterByMarca.push(product)
                            }
                      } ) 
                    }

                    let mitadCamino = filterByMarca.filter(producto => producto != undefined)
                    let allTalles = categoriaFiltros[1]
                    let filterByTalle = []
                    for (let i = 0; i < allTalles.length; i++) {
                        const talle = allTalles[i];
                        mitadCamino.map(product => {
                        
                            if (product.talle == talle) {
                                filterByTalle.push(product) 
                            } 
                      } ) 
                    }
                    let finishedFilter = filterByTalle.filter(producto => producto != undefined)
                    console.log(mitadCamino)
                    
            
                    productsFilterFinal = finishedFilter
                }
                
                else if ( categoriaFiltros[0].length != 0 && categoriaFiltros[1].length == 0 ) {
                    let allMarcas = categoriaFiltros[0]
                    let filterByMarca = []
                    for (let i = 0; i < allMarcas.length; i++) {
                        const marca = allMarcas[i];
                        products.map(product => {
                        
                            if (product.brand == marca) {
                              filterByMarca.push(product)
                            }
                      } ) 
                    }

                    let finalCamino = filterByMarca.filter(producto => producto != undefined)
                    productsFilterFinal = finalCamino
                }
                else if ( categoriaFiltros[1].length != 0  && categoriaFiltros[0].length == 0 ) {
                    let allTalles = categoriaFiltros[1]
                    let filterByTalle = []
                    for (let i = 0; i < allTalles.length; i++) {
                        const talle = allTalles[i];
                        products.map(product => {
                        
                            if (product.talle == talle) {
                                filterByTalle.push(product) 
                            } 
                      } ) 
                    }

                    let finalCamino = filterByTalle.filter(producto => producto != undefined)
                    productsFilterFinal = finalCamino
                }

                // console.log(categoriaFiltros)
                           // console.log(filteredProducts)
            res.render("listProducts", {
                articulos: productsFilterFinal,
                order: order,
                filter: filterFinal,
                toThousand: toThousand
                })
            } else {
                res.render("listProducts", {
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
    }
};

module.exports = controlador;