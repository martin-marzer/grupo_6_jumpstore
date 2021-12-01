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
    let resumeSubTotal = document.querySelector(".text-right .currency");
    let str = localStorage.getItem(`idCart`);
    // console.log(str);

    const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    if (str != null) {
        let arr = str.split(',');
        let productsCart = [...new Set(arr)]
        
        productsCart.forEach((id) => {
            fetch(`api/products/${id}`)
                .then(function (response) {
                    return response.json();
                })
                .then(products => {
                    let product = products.data;

                    let count = document.querySelector(".title").children[1]
                    if (productsCart.length > 1) {
                        count.innerHTML = `<strong>${productsCart.length}</strong> Productos`
                    } else {
                        count.innerHTML = `<strong>${productsCart.length}</strong> Producto`
                    }


                    let div = document.createElement("div")
                    div.classList.add("product")


                    div.innerHTML = `
                          <div class="img-product">
                          <img src="${product.images[0].url}">
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
                                  <img src="${product.images[0].url}">
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
                                          <p class="precio-zapas">$${product.price}</p> 
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>     
    `;

                    app.appendChild(div)
                    console.log(div);
                    let trash = div.children[1].children[0].children[0].children[1]
                    console.log(trash);


                    trash.addEventListener("click", (e) => {

                        e.preventDefault()
                        trash.onclick = quitarFav(product.id)

                        console.log(localStorage.getItem("idCart"));
                    })

                })
                .catch(function (error) {
                    console.error(error);
                });

        });



    } else {
        app.innerHTML =
            `<p> No tienes absolutamente nada en el carrito, ¡ve a la <a href="/sneakers/OrderByReleaseDateASC" style="text-decoration:underline; color: #000;"> tienda</a>!</p>`;
    }


})

