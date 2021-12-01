window.addEventListener("load", () => {
    // let getUserID = document.querySelector(".dropdown-content #user").dataset.test;
    let quitarFav = (id) => {

        let datos = localStorage.getItem(`idCart`);
        if (datos !== null) {
            let arr = datos.split(',');

            arr = arr.filter(i => {
                return i != id
            })
            localStorage.setItem(`idCart`, arr);

            if (arr.length == 0) {
                localStorage.removeItem(`idCart`);
            }
            window.location = window.location

        } else {
            localStorage.removeItem(`id${getUserID}`);
        }

    }


    const app = document.querySelector(".products-container");
    let str = localStorage.getItem(`idCart`);
    // console.log(str);


    if (str != null) {
        let arr = str.split(',');
        let productsCart = [...new Set(arr)]

        fetch(`api/products`)
            .then(function (response) {
                return response.json();
            })
            .then(products => {
                let allProducts = products.products;


                let count = document.querySelector(".title").children[1]
                if (productsCart.length > 1) {
                    count.innerHTML = `<strong>${productsCart.length}</strong> Productos`
                } else {
                    count.innerHTML = `<strong>${productsCart.length}</strong> Producto`
                }

                let validProducts = allProducts.map(product => {
                    if (productsCart.includes(product.id.toString())) {
                        return product
                    }
                })
                let filteredProducts = validProducts.filter(product => product != undefined)

                filteredProducts.forEach(product => {
                        let div = document.createElement("div")
                        div.classList.add("product")

                        if (product.discount == 0) {
                            div.innerHTML = `
                        <div class="img-product">
                            <a href="/sneakers/detail/${product.id}">
                                <img src="/images/zapatillas/${product.images[0].url}">
                            </a>
                        </div>
                        <div class="info-product">
                            <div class="up-info">
                                <div class="text-product">
                                    <div class="name">
                                        <p>${product.name}</p>
                                    </div>
                                    <div class="trash-icon">
                                        <i class="fas fa-trash-alt"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="down-info">
                                <div class="img-product-mobile">
                                    <a href="/sneakers/detail/${product.id}">
                                        <img src="/images/zapatillas/${product.images[0].url}">
                                    </a>
                                </div>
                                <div class="shopping-product">
                                    <div class="talle-edit">
                                        <p class="talle">Talle ${product.sizes[0].name}</p>
                                    </div>
                                    <div class="precio-cantidad">
                                        <div class="cantidad-selector">
                                            <p>Cantidad</p>
                                            <select name="select" class="selector-cantidad">
                                                          
                                              <option value="1">1 </option>
                                          
                                              <option value="2">2 </option>
                                          
                                              <option value="3">3 </option>
                                          
                                              <option value="4">4 </option>
                                          
                                              <option value="5">5 </option>
                                          
                                              <option value="6">6 </option>
                                          
                                              <option value="7">7 </option>
                                          
                                              <option value="8">8 </option>
                                          
                                              <option value="9">9 </option>
                                          
                                              <option value="10">10 </option>
                                         
                                          </select>
                                        </div>
                                        <div class="cantidad-precio-item">
                                            <p class="total-precio">Total</p>
                                            <p class="precio-zapas">$${product.price},00</p> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>     
                      `;
                        } else {
                            div.innerHTML = `
                            <div class="img-product">
                            <a href="/sneakers/detail/${product.id}">
                                <img src="/images/zapatillas/${product.images[0].url}">
                            </a>
                        </div>
                        <div class="info-product">
                            <div class="up-info">
                                <div class="text-product">
                                    <div class="name">
                                        <p>${product.name}</p>
                                    </div>
                                    <div class="trash-icon">
                                        <i class="fas fa-trash-alt"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="down-info">
                                <div class="img-product-mobile">
                                    <a href="/sneakers/detail/${product.id}">
                                        <img src="/images/zapatillas/${product.images[0].url}">
                                    </a>
                                </div>
                                <div class="shopping-product">
                                    <div class="talle-edit">
                                        <p class="talle">Talle ${product.sizes[0].name}</p>
                                    </div>
                                    <div class="precio-cantidad">
                                        <div class="cantidad-selector">
                                            <p>Cantidad</p>
                                            <select name="select" class="selector-cantidad">
                                                          
                                              <option value="1">1 </option>
                                          
                                              <option value="2">2 </option>
                                          
                                              <option value="3">3 </option>
                                          
                                              <option value="4">4 </option>
                                          
                                              <option value="5">5 </option>
                                          
                                              <option value="6">6 </option>
                                          
                                              <option value="7">7 </option>
                                          
                                              <option value="8">8 </option>
                                          
                                              <option value="9">9 </option>
                                          
                                              <option value="10">10 </option>
                                         
                                          </select>
                                        </div>
                                        <div class="cantidad-precio-item">
                                            <p class="total-precio">Total</p>
                                            <p class="precio-zapas">$${product.price - (product.price * product.discount / 100) },00</p> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>     
                      `;
                        }
    

    
                        app.appendChild(div)
                        // console.log(div);
                        let trash = div.children[1].children[0].children[0].children[1]
                        // console.log(trash);
    
    
                        trash.addEventListener("click", (e) => {
    
                            e.preventDefault()
                            trash.onclick = quitarFav(product.id)
    
                            console.log(localStorage.getItem("idCart"));
                        })
                    
                })
                return products.products
            })
            .then(() => {
                    const addCantidad = (id) => {
                        
                    }
                    let productsShopping = [... document.querySelectorAll(".product")]
                    productsShopping.forEach(product => {
                        let linkID = product.children[0].children[0].href.split("/")[5]
                        
                        let select = product.children[1].children[1].children[1].children[1].children[0].children[1]
                        select.addEventListener("change", addCantidad(linkID))
                        console.log(linkID);
                    })

                let resumeSubTotal = document.querySelector(".text-right.sub .currency");
                let resumeTotal = document.querySelector(".text-right.total .currency");
                let allPrices = document.querySelectorAll(".precio-zapas")
                allPrices = [...allPrices].map(precio => {
                    return  parseInt(precio.textContent.split("$")[1]) 

                })
                const reducer = (previousValue, currentValue) => previousValue + currentValue;
                let priceFinal = allPrices.reduce(reducer)
                resumeSubTotal.textContent = `$${priceFinal}`
                resumeTotal.textContent = `$${priceFinal}`
            })
            .catch(error => console.error(error))








    } else {
        app.innerHTML =
            `<p> No tienes absolutamente nada en el carrito, ¡ve a la <a href="/sneakers/OrderByReleaseDateASC" style="text-decoration:underline; color: #000;"> tienda</a>!</p>`;
    }


})

