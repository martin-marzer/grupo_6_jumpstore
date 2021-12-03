window.addEventListener("load", () => {
    const app = document.querySelector("main")
        const star = document.querySelector("i.far.fa-heart");


        const modalCont = document.createElement("div")
        modalCont.classList.add("data-fav")


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
                <p> Debes entrar a tu cuenta <a href="/login">Iniciar Sesión</a>.</p>
                <p> ¿No tienes Cuenta? Registrate aquí <a href="/register">Nueva Cuenta</a>.</p>
              </div>
          </div>


      </div>

  `
        app.appendChild(modalCont)

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
        star.addEventListener("click", (e) => {
            e.preventDefault()
            let modalFav = document.querySelector(".data-fav");
            let closeFav = document.querySelector(".data-fav .container-close .close");
            let modalChauFav = document.querySelector(".data-fav .myModal .modal-content");

            showHideModal(modalFav, closeFav, modalChauFav)
        })
})