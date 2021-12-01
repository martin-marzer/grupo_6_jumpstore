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




  let currentUrl = window.location.href
  let currentID = currentUrl.split("/")[5]
  let selectTalle = document.querySelector("#talle")
  let buttonSubmit = document.querySelector(".field.login button")
  let talleText = document.querySelector(".product-text-talle p")


  let agregarProduct = (id) => {

    let datos = localStorage.getItem(`idCart`);
    if (datos !== null) {
      let arr = datos.split(',');
      arr.push(id);
      localStorage.setItem(`idCart`, arr);

    } else {
      localStorage.setItem(`idCart`, id);
    }

  }

  const selectedEmpty = () => {
    if (selectTalle.value != "") {
      talleText.style.display = "none"
      buttonSubmit.style.backgroundColor = "rgb(0, 0, 0)"
      buttonSubmit.disabled = false
    }
  }

  selectedEmpty()


  selectTalle.addEventListener("change", (e) => {
    selectedEmpty()
  })

  buttonSubmit.addEventListener("click", (e) => {
    let datos = localStorage.getItem(`idCart`);
    if (selectTalle.value != "") {
      alert("talle selecionado")
      if (datos == null) {
        alert("local id nuevo creado")
        buttonSubmit.onclick = agregarProduct(currentID)
        window.location = window.location

      } else {
        let arr;
        if (datos.search(",") != -1) {
          arr = datos.split(',');
          if (!arr.includes(currentID)) {
            buttonSubmit.onclick = agregarProduct(currentID)
            window.location = window.location
          } else {
            alert("array contiene ya el producto")
          }
          
        } else {
            if (datos != currentID) {
              buttonSubmit.onclick = agregarProduct(currentID)
              window.location = window.location
            } else {
              alert("el producto ya esta")
            }
          }

      }
    } else {
      alert("talle no seleccionado")
    }
  }, { once: true })


})



