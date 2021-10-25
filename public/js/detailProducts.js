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
      document.addEventListener('mouseup', function(e) {
        if (!modalChau[i].contains(e.target)) {
          modal[i].style.display = 'none';
        }
      });

    }
  if ( modal[i].style.display = "none") {
      btnModal[i].onclick = function() {
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
    link.href =  "/sneakers/OrderByReleaseDateASC"
  }
  else if (prevLinkArray.includes("sneakers") || prevLinkArray.includes("ofertas")) {
    link.href = document.referrer
  }
  else {
    link.href = "/" + prevLinkArray[3] +"/" + "OrderByReleaseDateASC"
  }
 }
 let carritoAdd = () => {
  let buttonSubmit =  document.querySelector(".field.login button")
  let select = document.querySelector("#talle")
  buttonSubmit.disabled = true
  if (buttonSubmit.disabled == true) {
    buttonSubmit.style.filter ="opacity(0.3)"
    buttonSubmit.style.cursor = "default"
  }

  if (select.value != "") {
    buttonSubmit.disabled = false
    buttonSubmit.style.filter =""
    buttonSubmit.style.cursor = "pointer"
  }

   let form = document.querySelector("#form-desktop");
  //  console.log(form);
   ["change", "submit"].forEach((e) => {
    form.addEventListener(e, () => {
      if (select.value != "") {
        buttonSubmit.disabled = false
        buttonSubmit.style.filter =""
        buttonSubmit.style.cursor = "pointer"
      } else {
        e.preventDefault()
      }
    })
   })
 }

  modalDescription()
  linkBreadcrumbs()
  carritoAdd()
})



