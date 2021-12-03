window.addEventListener("load", () => {
  // button to scroll up according its height (lo q dice pero en español jeje)

  let btn = $('.button-scroll');

  $(window).scroll(function () {
    if ($(window).scrollTop() > 300) {
      btn.addClass('show');
    } else {
      btn.removeClass('show');
    }
  });

  btn.on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, '300');
  });


  let urlArraySelected = window.location.pathname.split("/");
  let links = document.querySelectorAll(".row-jumpstore ul li a")


  // acordion del footer y descrip detail product
  let acc = document.getElementsByClassName("jumpstore-arrow");
  let i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      this.classList.toggle("active");
      let panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }

  let widthScript = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

  if (widthScript <= 768) {
    // barra de navegacion para el celular  

    $('.btn-menu').click(function () {
      // $("#opacity-mobile").addClass("show-opacity");
      $(".sidenav").toggleClass("open-menu");
      // $('body').css('overflow', 'hidden');
    });




  } else {
    linksFunc = () => {
      if (urlArraySelected[1] == "") {
        links[0].classList.add("selected")
      }
      else if (urlArraySelected.length >= 2 && urlArraySelected.includes("sneakers") && !urlArraySelected.includes("detail")) {
        links[1].classList.add("selected")
      }
      else if (urlArraySelected.length >= 2 && urlArraySelected.includes("ofertas")) {
        links[2].classList.add("selected")
      }
      else if (urlArraySelected.length >= 2 && urlArraySelected.includes("favorites")) {
        links[3].classList.add("selected")
      }
    }
    linksFunc()
  }


  let getUserID = document.querySelector(".dropdown-content #user");

  if (getUserID != null) {
    let userID = getUserID.dataset.test;
    console.log(getUserID.dataset.test);

    let olderDatos = localStorage.getItem(`idCart`);
    let datos = localStorage.getItem(`idCart-${userID}`);

    if (olderDatos) {
      if (!datos) {
        localStorage.setItem(`idCart-${userID}`, olderDatos);   
      }
      localStorage.removeItem(`idCart`)
    }
    
    let cartItems = document.querySelector("#jumpstore-cart div p")
    if (datos != null) {
      let arr = datos.split(',');
      cartItems.textContent = arr.length
    } else {
      cartItems.textContent = "0"
    }

  } else {
    
    let datos = localStorage.getItem(`idCart`);

    let cartItems = document.querySelector("#jumpstore-cart div p")
    if (datos != null) {
      let arr = datos.split(',');
      cartItems.textContent = arr.length
    } else {
      cartItems.textContent = "0"
    }

  }




})


