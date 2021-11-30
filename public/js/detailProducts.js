window.addEventListener("load", () => {

  let currentUrl = window.location.href
  let currentID = currentUrl.split("/")[5]
  console.log(currentID);

  let agregarFav = (id) => {

    let datos = localStorage.getItem(`id${currentID}`);
    if (datos !== null) {
        let arr = datos.split(',');
        arr.push(id);
        localStorage.setItem(`id${currentID}`, arr);

    } else {
        localStorage.setItem(`id${currentID}`, id);
    }

}


let quitarFav = (id) => {

    let datos = localStorage.getItem(`id${currentID}`);
    if (datos !== null) {
        let arr = datos.split(',');

        arr = arr.filter(i => {
            return i != id
        })
        localStorage.setItem(`id${currentID}`, arr);

        if (arr.length == 0) {
            localStorage.removeItem(`id${currentID}`);
        }

    } else {
        localStorage.removeItem(`id${currentID}`);
    }

}

const star = document.querySelector("i.far.fa-heart");
// console.log(star);

let starSelect = (id) => {
    let datos = localStorage.getItem(`id${currentID}`);
    if (datos != null) {
        let arr = datos.split(',');
        if (arr.includes(id.toString())) {
            star.classList.add("fas")
            star.classList.remove("far")
            star.style.color = "#f32929"
        }
    }
}

starSelect(currentID)

star.addEventListener("click", (e) => {

    e.preventDefault()
    if (star.classList.value.indexOf("far") != -1) {
        star.classList.add("fas")
        star.classList.remove("far")
        star.style.color = "#f32929"
        star.onclick = agregarFav(currentID)


        console.log(localStorage.getItem(`id${currentID}`));

    } else {
        star.classList.remove("fas")
        star.classList.add("far")
        star.style.color = "#050000"
        star.onclick = quitarFav(currentID)

        console.log(localStorage.getItem(`id${currentID}`));
    }

})



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
  let favButton = document.querySelector(".field.fav")
  let desc = document.querySelector(".jumpstore-arrow")

  let form = document.querySelector("#form-desktop");


  // form.addEventListener("submit", (e) => {
    
  //     e.preventDefault()
  // })

  //  [ "load", "change", "submit"].forEach((e) => {
  //   form.addEventListener(e, () => {
  //     console.log(select.value);
  //     if (select.value != "") {
  //       buttonSubmit.disabled = false
  //       buttonSubmit.style.filter =""
  //       buttonSubmit.style.cursor = "pointer"
  //     } else {
  //       e.preventDefault()
  //     }
  //   })
  //   if (buttonSubmit.disabled == true) {
  //     buttonSubmit.style.filter ="opacity(0.3)"
  //     buttonSubmit.style.cursor = "default"
  //   }
  //  })
   
  
 }

  modalDescription()
  linkBreadcrumbs()
  carritoAdd()
})



