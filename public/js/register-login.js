let form = document.getElementById("password")
console.log(form)
let eyePsw = document.querySelector(".field.psw i")
console.log(eyePsw)
eyePsw.addEventListener ("click", hola);
function hola () {
    if (eyePsw.className != "fas fa-eye-slash") {
        eyePsw.className = "fas fa-eye-slash"
        form.type = "text"
    }else {
        eyePsw.className = "fas fa-eye"
        form.type = "password"
    }
}
if (form) {
    
}
let form2 = document.getElementById("password-confirm")
let eyePsw2 = document.querySelector(".field.psw-confirm i")
if (eyePsw2 != null) {
    eyePsw2.addEventListener ("click", chau);
function chau () {
    if (eyePsw2.className != "fas fa-eye-slash") {
        eyePsw2.className = "fas fa-eye-slash"
        form2.type = "text"
    }else {
        eyePsw2.className = "fas fa-eye"
        form2.type = "password"
    }
}
}

