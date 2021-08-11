// barra de navegacion para el celular  


/* Set the width of the side navigation to 250px */
function openNav() {
  document.getElementById("jumpstore-navbar-mobile").style.left = "0";
  document.getElementById("opacity-mobile").style.opacity = "1";
  document.getElementById("opacity-mobile").style.width = "100%";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("jumpstore-navbar-mobile").style.left = "-100%";
  document.getElementById("opacity-mobile").style.opacity = "0";
  document.getElementById("opacity-mobile").style.width = "0";
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


// button to scroll up

let btn = $('.button-scroll');

$(window).scroll(function() {
  if ($(window).scrollTop() > 300) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});

btn.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '300');
});
 








// asaa