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
var acc = document.getElementsByClassName("jumpstore-arrow");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}