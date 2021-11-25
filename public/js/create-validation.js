window.addEventListener("load", () => {

	let url = window.location.href
	let prevURL = document.referrer;

    if (url != prevURL) {
    const form = document.querySelector("form.formulario-register")

    let inputs = document.querySelectorAll("form.formulario-register input");
    let selects = document.querySelectorAll("form.formulario-edit select");
    let textarea = document.querySelector("textarea")
    let img = document.getElementById('myFile');
    

    const campos = {
        name: false,
        precio: false,
        descuento: false,
        stock: false,
        img: false,
        desc: false
    }


    const validarFormulario = (e) => {
        switch (e.target.name) {
            case "name":
                validarCampo(e.target, 'name');
                break;
            case "precio":
                validarCampo(e.target, 'precio');
                break;
            case "descuento":
                validarCampo(e.target, 'descuento');
                break;
            case "stock":
                validarCampo(e.target, 'stock');
                break;
            case "descripcion":
                validarCampo(e.target, 'desc');
                break;
        }
    }



    const validarExt = () => {
        let card = document.querySelector(`p.error-myFile`);
        card.style.color = "#FF4F4F"
        let archivoInput = document.querySelector("#myFile")
        let extPermitidas =  ["jpg", "png", "jpeg"];
        if (archivoInput.files.length == 3) {
            let files = [...archivoInput.files]
            let isValid = true;
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                let ext = file.name.split(".")[1]
                if (!extPermitidas.includes(ext)) {
                    isValid = false;
                   break;
                }
            }
            if (isValid) {
                card.innerHTML = ""
                card.style.margin = "0"
                campos.img = true;
            } else {
                card.innerHTML = `solo se admiten .jpg, .png, .jpeg`
                card.style.margin = "revert"
                campos.img = false;
            }

        } else {
            card.innerHTML = `Debes subir 3 archivos`
            card.style.margin = "revert"
            campos.img = false;
        }

    }

    
    const validarCampo = (input, campo) => {
        let card = document.querySelector(`p.error-${campo}`);
        card.innerHTML = ""
        card.style.color = "#FF4F4F"
        if (input.value == "") {
            card.innerHTML = `el campo ${input.name} no puede estar vacio`
            card.style.margin = "revert"
            campos[campo] = false
        } else if ( input.name == "name" && input.value.length < 5){
            card.innerHTML = `el campo ${input.name} debe tener 5 caracteres`
            card.style.margin = "revert"
            campos[campo] = false
        } else if ( input.name == "descripcion" && input.value.length < 20){
            card.innerHTML = `el campo ${input.name} debe tener 20 caracteres`
            card.style.margin = "revert"
            campos[campo] = false
        } else {
            card.innerHTML = ""
            card.style.margin = "0"
            campos[campo] = true
        }
    }

    inputs.forEach((input) => {
        input.addEventListener('keyup', validarFormulario);
        input.addEventListener('blur', validarFormulario);
    });

    textarea.addEventListener('keyup', validarFormulario);
    textarea.addEventListener('blur', validarFormulario);
    img.addEventListener("change", validarExt)

    form.addEventListener('submit', (e) => {

        if (!(campos.name && campos.desc && campos.img && campos.precio && campos.descuento && campos.stock)) {
            e.preventDefault();
        }
        console.log(campos);


    });
    }



    

})