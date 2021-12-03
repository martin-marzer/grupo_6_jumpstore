window.addEventListener("load", () => {
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

    let allProducts = document.querySelectorAll(".product-container")
    let productsArr = [...allProducts]
    productsArr.forEach(product => {
        const fav = product.children[1].children[0];
        const linkID = product.children[0].href.split("/")[5]
        // console.log(fav);

        let favSelect = (id) => {
            let datos = localStorage.getItem(`id${getUserID}`);
            if (datos != null) {
                let arr = datos.split(',');
                if (arr.includes(id.toString())) {
                    fav.classList.add("fas")
                    fav.classList.remove("far")
                }
            }
        }

        favSelect(linkID)

        fav.addEventListener("click", (e) => {

            e.preventDefault()
            if (fav.classList.value.indexOf("far") != -1) {
                fav.classList.add("fas")
                fav.classList.remove("far")
                fav.onclick = agregarFav(linkID)


                console.log(localStorage.getItem(`id${getUserID}`));

            } else {
                fav.classList.remove("fas")
                fav.classList.add("far")
                fav.onclick = quitarFav(linkID)

                console.log(localStorage.getItem(`id${getUserID}`));
            }

        })
    })

})