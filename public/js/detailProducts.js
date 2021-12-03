window.addEventListener("load", () => {


  let modalDescription = () => {
    // Get the modal
    let modal = document.getElementsByClassName("data");

    // Get the button that opens the modal
    let btnModal = document.getElementsByClassName("myBtn");


    // Get the <span> element that closes the modal
    let span = document.getElementsByClassName("close");

    let modalChau = document.getElementsByClassName("modal-content");

    for (let i = 0; i < modal.length; i++) {
      if (modal[i].style.display = "block") {
        span[i].onclick = () => {
          modal[i].style.display = "none";
        }
        document.addEventListener('mouseup', function (e) {
          if (!modalChau[i].contains(e.target)) {
            modal[i].style.display = 'none';
          }
        });

      }
      if (modal[i].style.display = "none") {
        btnModal[i].onclick = function () {
          modal[i].style.display = "block";
        }
      }

    }
  }
  let linkBreadcrumbs = () => {
    let link = document.getElementsByClassName("breadcrumbs-link")[1];
    let prevLink = document.referrer
    let prevLinkArray = prevLink.split("/")

    if (prevLinkArray.length == 1 || prevLinkArray.length == 4) {
      link.href = "/sneakers/OrderByReleaseDateASC"
    }
    else if (prevLinkArray.includes("sneakers") || prevLinkArray.includes("ofertas")) {
      link.href = document.referrer
    }
    else {
      link.href = "/" + prevLinkArray[3] + "/" + "OrderByReleaseDateASC"
    }
  }

  modalDescription()
  linkBreadcrumbs()



  const app = document.querySelector("main")

  const modalCont = document.createElement("div")
  modalCont.classList.add("data-cart")

  modalCont.innerHTML = `
  <div class="myModal" class="modal">

      <!-- Modal content -->
      <div class="modal-content">
          <div class="container-modal">

              <div class="container-close">
                  <button class="close">&times;</button>
              </div>

              <div class="container-title">
                  <p>Acción Invalida</p>
              </div>

              <br>

              <div class="error-msg">
                  <p> Error</p>
                  <p> Lo sentimos</p>
              </div>
          </div>


      </div>

  `
  app.appendChild(modalCont)


  let currentUrl = window.location.href
  let currentID = currentUrl.split("/")[5]
  let selectTalle = document.querySelector("#talle")
  let buttonSubmit = document.querySelector(".field.login button")
  let talleText = document.querySelector(".product-text-talle p")



  let modalCart = document.querySelector(".data-cart");
  let closeCart = document.querySelector(".data-cart .container-close .close");
  let modalChauCart = document.querySelector(".data-cart .myModal .modal-content");
  let errorMessage = document.querySelector(".data-cart .myModal .modal-content .error-msg p");



  const showHideModal = (modal, close, modalChau) => {
    console.log(closeCart);
    if (modal.style.display = "block") {
      close.addEventListener("click", () => {
        modal.style.display = "none";
      })
      document.addEventListener('mouseup', function (e) {
        if (!modalChau.contains(e.target)) {
          modal.style.display = 'none';
        }
      });

    }
  }
  const errorMessageCart = (message) => {

    errorMessage.innerHTML = message

    showHideModal(modalCart, closeCart, modalChauCart)

  }


  let getUserID = document.querySelector(".dropdown-content #user");

  let agregarCart;
  let datos;
  let arr;
  if (getUserID) {
    let userID = getUserID.dataset.test;
    agregarCart = (id) => {
      datos = localStorage.getItem(`idCart-${userID}`);
      if (datos !== null) {
        arr = datos.split(',');
        arr.push(id);
        localStorage.setItem(`idCart-${userID}`, arr);
  
      } else {
        localStorage.setItem(`idCart-${userID}`, id);
      }
    }

  } else {
    agregarCart = (id) => {
      datos = localStorage.getItem(`idCart`);
      if (datos !== null) {
        arr = datos.split(',');
        arr.push(id);
        localStorage.setItem(`idCart`, arr);
  
      } else {
        localStorage.setItem(`idCart`, id);
      }
    }
  }



  const selectedEmpty = () => {
    if (selectTalle.value != "") {
      talleText.style.display = "none"
      buttonSubmit.style.backgroundColor = "rgb(0, 0, 0)"
    } else {
      talleText.style.display = "block"
      buttonSubmit.style.backgroundColor = "rgb(0, 0, 0, 0.2)"
    }
  }

  selectedEmpty()


  selectTalle.addEventListener("change", (e) => {
    selectedEmpty()
  })

  buttonSubmit.addEventListener("click", (e) => {
    let datos;

    if (getUserID) {
      let userID = getUserID.dataset.test;
      datos = localStorage.getItem(`idCart-${userID}`)
    } else {
      datos = localStorage.getItem(`idCart`)
    }


    if (selectTalle.value != "") {

      if (datos == null) {
        buttonSubmit.onclick = agregarCart(currentID)
        window.location = window.location

      } else {
        let arr;
        if (datos.search(",") != -1) {
          arr = datos.split(',');
          if (!arr.includes(currentID)) {
            buttonSubmit.onclick = agregarCart(currentID)
            window.location = window.location
          } else {
            errorMessageCart("El producto ya esta en la lista (arr)", modalCart, closeCart, modalChauCart)
          }

        } else {
          if (datos != currentID) {
            buttonSubmit.onclick = agregarCart(currentID)
            window.location = window.location
          } else {
            errorMessageCart("El producto ya esta en la lista", modalCart, closeCart, modalChauCart)
          }
        }

      }
    } else {
      errorMessageCart("No has seleccionado talle", modalCart, closeCart, modalChauCart)
    }
  })


})



