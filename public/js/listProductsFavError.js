window.addEventListener("load", () => {

    let allProducts = document.querySelectorAll(".product-container")
    let productsArr = [...allProducts]
    productsArr.forEach(product => {
      const star =  product.children[1].children[0];
  
      star.addEventListener("click", (e) => { 
        
        e.preventDefault()
        alert("Debes loguearte")
        window.location.href = "/login"
    
      })
    })
    
})