let productsContainer = document.querySelectorAll(".products-container")[0] 
// .innerHTML = "Hola"
// console.log(productsContainer)

let products = document.querySelectorAll(".product-container")


let info = document.querySelectorAll(".titulos_conteiner li");
// console.log(info)

for (let i = 0; i < info.length; i++) {
    eachINFO = info[i];
    if (i == 1) {
        eachINFO.onclick = sortByID;
    }
    // else if (i == 4) {
    //     eachINFO.onclick = sortByPrice;
    // }
    // console.log(eachINFO)
}


// si el primer id q se ve es 1 apretas y te lleva al ultimo y viceversa
function sortByID() {
    // esto es para pasar el array ahora al reves :P
let productsNew = []
for (let i = 0; i < products.length; i++) {
    let eachproduct = products[i].outerHTML;
    productsNew.unshift(eachproduct) 
    // console.log(eachproduct)
}
    if (productsContainer.innerHTML == productsNew.join("")) {
        productsContainer.innerHTML = productsNew.reverse().join("")
    } else {
        productsContainer.innerHTML = productsNew.join("")
    }

}




function sortByPrice() {
    // console.log(products[0].children[0].children[5].innerText)
let eachPrice = [];
for (let i = 0; i < products.length; i++) {
    // let eachproduct = products[i].outerHTML;
     let eachproduct = products[i];
    eachPrice.push(eachproduct.children[0].children[5].innerText);
    
}
console.log(eachPrice)
productsContainer.innerHTML = eachPrice
    // alert("acomodando el precio, como pingo hagoooooo")
    // console.log(products)
}



// let products = document.querySelectorAll(".product-container")
// let productsNew = []
// productsContainer.innerHTML += productsNew.innerHTML; 
// // let info = document.querySelectorAll(".titulos_conteiner li");
// // [0].innerHTML
// // let eachINFO
// , eachINFOtext = [];
// for (let i = 0; i < 4; i++) {
//     eachINFO = info[i];
//     eachINFOtext.push(eachINFO.innerHTML)
//     console.log(eachINFO)
// }
// // eachINFO.onclick = hola;
// // function hola() {
// //     alert(eachINFOtext)
// // }
// // console.log(info)
// let info = document.querySelectorAll(".titulos_conteiner li")[1];
// info.onclick = sortName;
// let order = false;
// function sortName(){
//     // order = !order;
//     // products.sort(function (a, b) {
//     //   const x = a.name.toLowerCase();
//     //   const y = b.name.toLowerCase();
//     //   return (order ? x > y : x < y);
//     // });
//     // console.log(products);
//     // let reverse = products.reverse
//     // products = reverse
//     for (let i = 0; i < products.length; i++) {
//         let eachproduct = products[i];
//         productsNew.unshift(eachproduct)
        
        
        
//     }
//     console.log(productsNew)
//     alert("hola")
//   }
// console.log(info.innerHTML)
// //   let finalProduct = JSON.stringify(newBasedata, null, 2)

// //   fs.writeFileSync(productsFilePath, finalProduct) 