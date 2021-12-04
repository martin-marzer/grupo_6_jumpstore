window.addEventListener("load", () => {

    let currentUrl = window.location.href
    let currentID = currentUrl.split("/")[5]
    let getUserID = document.querySelector(".dropdown-content #user").dataset.test;
  
    let agregarFav = (id) => {
  
      let datos = localStorage.getItem(`id${getUserID}`);
      if (datos !== null) {
          let arr = datos.split(',');
          arr.push(id);
          localStorage.setItem(`id${getUserID}`, arr);
  
      } else {
          localStorage.setItem(`id${getUserID}`, id);
      }
  
  }
  
  
  let quitarFav = (id) => {
  
      let datos = localStorage.getItem(`id${getUserID}`);
      if (datos !== null) {
          let arr = datos.split(',');
  
          arr = arr.filter(i => {
              return i != id
          })
          localStorage.setItem(`id${getUserID}`, arr);
  
          if (arr.length == 0) {
              localStorage.removeItem(`id${getUserID}`);
          }
  
      } else {
          localStorage.removeItem(`id${getUserID}`);
      }
  
  }
  
  const star = document.querySelector("i.far.fa-heart");
  // console.log(star);
  
  let starSelect = (id) => {
      let datos = localStorage.getItem(`id${getUserID}`);
      console.log(datos);
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
  
          console.log(localStorage.getItem(`id${getUserID}`));
      }
  
  })
})  