window.addEventListener("load", () => {
    const app = document.querySelector("main")
    let allProducts = document.querySelectorAll(".product-container")
    let productsArr = [...allProducts]

    const showHideModal = (modal, close, modalChau) => {
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

    productsArr.forEach(product => {
      const fav =  product.children[1].children[0];
  
      fav.addEventListener("click", (e) => { 
        
        e.preventDefault()


        const modalCont = document.createElement("div")
        modalCont.classList.add("data")

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

                    <div>
                        <p> Debes entrar a tu cuenta <a href="/login">Iniciar Sesión</a>.</p>
                        <p> ¿No tienes Cuenta? Registrate aquí <a href="/register">Nueva Cuenta</a>.</p>
                    </div>
                </div>


            </div>

        `
        app.appendChild(modalCont)

        let modal = document.querySelector(".data");
        let close = document.querySelector(".container-close .close");
        let modalChau = document.querySelector(".myModal .modal-content");

        showHideModal(modal, close, modalChau)


    
      })
    })
    
})