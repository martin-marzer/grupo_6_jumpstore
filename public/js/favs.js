window.addEventListener("load", () => {
    let getUserID = document.querySelector(".dropdown-content #user").dataset.test;

    let agregarFav = (id) => {

        let datos = localStorage.getItem(`id${getUserID}`);
        if (datos !== null) {
            let arr = datos.split(',');
            arr.push(id);
            localStorage.setItem(`id${getUserID}`, arr);

        } else {
            localStorage.setItem(`id${getUserID}`, id);
            window.location = window.location
        }

    }


    let quitarFav = (id) => {

        let datos = localStorage.getItem(`id${getUserID}`);
        if (datos !== null) {
            let arr = datos.split(',');

            arr = arr.filter(i => {
                return i != id
            })
            localStorage.setItem(`id${getUserID}`, arr);

            if (arr.length == 0) {
                localStorage.removeItem(`id${getUserID}`);
            }
            window.location = window.location

        } else {
            localStorage.removeItem(`id${getUserID}`);
        }

    }


    const app = document.querySelector(".products-container");

    let str = localStorage.getItem(`id${getUserID}`);
    // console.log(str);

    const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    if (str != null) {
        let arr = str.split(',');
        let favoritas = [...new Set(arr)]

        fetch(`api/products`)
            .then(function (response) {
                return response.json();
            })
            .then(products => {
                let allProducts = products.products;

                let count = document.querySelector(".results-container p")
                count.innerHTML =
                    `<strong>${favoritas.length}</strong> Productos Favoritos`


                let validProducts = allProducts.map(product => {
                    if (favoritas.includes(product.id.toString())) {
                        return product
                    }
                })

                let filteredProducts = validProducts.filter(product => product != undefined)

                filteredProducts.forEach(product => {
                    console.log(filteredProducts);
                    let div = document.createElement("div")
                    div.classList.add("product-container")


                    if (product.discount == 0) {
                        div.innerHTML = `
<a href="/sneakers/detail/${product.id}" class="link-detail">
  <div class="product">
      
      <div class="info-product">
          <div class="img-container">
              <img src="/images/zapatillas/${product.images[0].url}" alt="producto" class="img-product">
          </div>
          <div class="text">
              <div class="sneaker-name">
                  <p>${product.name}</p>
              </div>
              <div class="price">

                  <p> $ ${toThousand(product.price)}</p>

              </div>                                             
          </div>
      </div>
  </div>
</a>
<div class="container-heart">
  <i class="far fa-heart"></i>
</div>            
`;
                    } else {
                        div.innerHTML = `
<a href="/sneakers/detail/${product.id}" class="link-detail">
  <div class="product">
      
      <div class="sale">
        <div class="discount">
            ${product.discount}% OFF
        </div>
    </div>

      <div class="info-product">
          <div class="img-container">
              <img src="/images/zapatillas/${product.images[0].url}" alt="producto" class="img-product">
          </div>
          <div class="text">
              <div class="sneaker-name">
                  <p>${product.name}</p>
              </div>
              <div class="price">

                <p>$${toThousand(product.price - (product.price * product.discount / 100))} </p>
                <p class="oldPrice">$${toThousand(product.price)}</p>

              </div>                                             
          </div>
      </div>
  </div>
</a>
<div class="container-heart">
  <i class="far fa-heart"></i>
</div>            
`;
                    }


                    app.appendChild(div)
                    let fav = div.children[1].children[0]

                    let favSelect = (id) => {
                        let datos = localStorage.getItem(`id${getUserID}`);
                        if (datos != null) {
                            let arr = datos.split(',');
                            if (arr.includes(id.toString())) {
                                fav.classList.add("fas")
                                fav.classList.remove("far")
                            }
                        }
                    }


                    favSelect(product.id)

                    fav.addEventListener("click", (e) => {

                        e.preventDefault()
                        if (fav.classList.value.indexOf("far") != -1) {
                            fav.classList.add("fas")
                            fav.classList.remove("far")
                            fav.onclick = agregarFav(product.id)


                            console.log(localStorage.getItem("id"));

                        } else {
                            fav.classList.remove("fas")
                            fav.classList.add("far")
                            fav.onclick = quitarFav(product.id)

                            console.log(localStorage.getItem("id"));
                        }

                    })
                })

            })

        // favoritas.forEach((id) => {
        //     fetch(`api/products/${id}`)
        //         .then(function (response) {
        //             return response.json();
        //         })
        //         .then(products => {
        //             let product = products.data;

        //             let count = document.querySelector(".results-container p")
        //             count.innerHTML =
        //                 `<strong>${favoritas.length}</strong> Productos Favoritos`



        //         })
        //         .catch(function (error) {
        //             console.error(error);
        //         });

        // });

    } else {
        app.innerHTML =
            `<p> No tienes absolutamente nada en favoritos, ¡ve a la <a href="/sneakers/OrderByReleaseDateASC" style="text-decoration:underline;"> tienda</a>!</p>`;
    }


})

