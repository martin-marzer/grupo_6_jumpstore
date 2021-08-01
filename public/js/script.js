// barra de navegacion para el celular  
/* Set the width of the side navigation to 250px */
function openNav() {
  document.getElementById("jumpstore-navbar-mobile").style.width = "80%";
  document.getElementById("opacity-mobile").style.display = "block";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("jumpstore-navbar-mobile").style.width = "0";
  document.getElementById("opacity-mobile").style.display = "none";
}

// acordion del footer
let acc = document.getElementsByClassName("jumpstore-arrow");
let i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    let panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}


// acá es para la barra mobile para que aparezca cuando haces para arriba

let prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  let currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.querySelector(".main-header").style.top = "0";
  } else {
    document.querySelector(".main-header").style.top = "-100%";
  }
  prevScrollpos = currentScrollPos;
}