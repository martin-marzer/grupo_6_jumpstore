/* Set the width of the side navigation to 250px */
function openNav() {
  document.getElementById("jumpstore-navbar-mobile").style.width = "80%";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("jumpstore-navbar-mobile").style.width = "0";
}


var acc = document.getElementsByClassName("jumpstore-arrow");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}