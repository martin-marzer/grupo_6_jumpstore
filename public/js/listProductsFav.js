window.addEventListener("load", () => {

    let agregarFav = (id) => {
    
      let datos = sessionStorage.getItem('id');
      if (datos !== null) {
        let arr = datos.split(',');
        arr.push(id);
        sessionStorage.setItem('id', arr);
  
      } else {
        sessionStorage.setItem('id', id);
      }
  
    }
  
  
    let quitarFav = (id) => {
    
      let datos = sessionStorage.getItem('id');
      if (datos !== null) {
        let arr = datos.split(',');
  
        arr = arr.filter(i => {
          return i != id
        })
        sessionStorage.setItem('id', arr);
  
        if (arr.length == 0) {
          sessionStorage.removeItem('id');
        }
        
      } 
      else {
        sessionStorage.removeItem('id');
      }
  
    }
  
    let allProducts = document.querySelectorAll(".product-container")
    let productsArr = [...allProducts]
    productsArr.forEach(product => {
      const star =  product.children[1].children[0];
      const linkID = product.children[0].href.split("/")[5]
      // console.log(star);
      
      let starSelect = (id) => {
        let datos = sessionStorage.getItem('id');
        if (datos != null) {
          let arr = datos.split(',');
          if (arr.includes(id.toString() ) ) {
            star.classList.add("fas")
            star.classList.remove("far")
          }
        }
      }
    
      starSelect( linkID )
    
      star.addEventListener("click", (e) => { 
        
        e.preventDefault()
        if (star.classList.value.indexOf("far") != -1 ) {
          star.classList.add("fas")
          star.classList.remove("far")
          star.onclick = agregarFav(linkID)
    
          
          console.log(sessionStorage.getItem("id"));
          
        } else {
          star.classList.remove("fas")
          star.classList.add("far")
          star.onclick = quitarFav(linkID)
    
          console.log(sessionStorage.getItem("id"));
        }
    
      })
    })
    
})