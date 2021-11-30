window.addEventListener("load", () => {


  let agregarFav = (id) => {

    let datos = sessionStorage.getItem('id');
    if (datos !== null) {
      let arr = datos.split(',');
      arr.push(id);
      sessionStorage.setItem('id', arr);

    } else {
      sessionStorage.setItem('id', id);
      window.location = window.location
    }

  }


  let quitarFav = (id) => {

    let datos = sessionStorage.getItem('id');
    if (datos !== null) {
      let arr = datos.split(',');

      arr = arr.filter(i => {
        return i != id
      })
      sessionStorage.setItem('id', arr);

      if (arr.length == 0) {
        sessionStorage.removeItem('id');
      }
      window.location = window.location

    }
    else {
      sessionStorage.removeItem('id');
    }

  }

  const app = document.querySelector(".products-container");

  let str = sessionStorage.getItem('id');
  console.log(str);

  const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  if (str != null) {

    let arr = str.split(',');
    let favoritas = [...new Set(arr)]

    favoritas.forEach((id) => {
      fetch(`api/products/${id}`)
        .then(function (response) {
          return response.json();
        })
        .then(products => {
          let product = products.data;

          let count = document.querySelector(".results-container p")
          count.innerHTML = `<strong>${favoritas.length}</strong> Productos Favoritos`

          let div = document.createElement("div")
          div.classList.add("product-container")


          if (product.discount == 0) {
            div.innerHTML = `
            <a href="/sneakers/detail/${product.id}" class="link-detail">
                <div class="product">
                    
                    <div class="info-product">
                        <div class="img-container">
                            <img src="${product.images[0].url}" alt="producto" class="img-product">
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
                            <img src="${product.images[0].url}" alt="producto" class="img-product">
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
          let star = div.children[1].children[0]
          console.log(star);



          let starSelect = (id) => {
            let datos = sessionStorage.getItem('id');
            if (datos != null) {
              let arr = datos.split(',');
              if (arr.includes(id.toString())) {
                star.classList.add("fas")
                star.classList.remove("far")
              }
            }
          }

          starSelect(product.id)

          star.addEventListener("click", (e) => {

            e.preventDefault()
            if (star.classList.value.indexOf("far") != -1) {
              star.classList.add("fas")
              star.classList.remove("far")
              star.onclick = agregarFav(product.id)


              console.log(sessionStorage.getItem("id"));

            } else {
              star.classList.remove("fas")
              star.classList.add("far")
              star.onclick = quitarFav(product.id)

              console.log(sessionStorage.getItem("id"));
            }

          })

        })
        .catch(function (error) {
          console.error(error);
        });

    });

  } else {
    app.innerHTML = `<p> No tienes absolutamente nada en favoritos, ¡ve a la <a href="/sneakers/OrderByReleaseDateASC"> tienda! </a> </p>`;
  }


})

