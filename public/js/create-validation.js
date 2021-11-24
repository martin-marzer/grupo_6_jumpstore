window.addEventListener("load", () => {
    const form = document.querySelector("form.formulario-register")


    let inputs = document.querySelectorAll("form.formulario-register input");
    let textarea = document.querySelector("textarea")

    let img = document.getElementById('myFile');
    

    const campos = {
        name: false,
        desc: false,
        img: false
    }


    const validarFormulario = (e) => {
        switch (e.target.name) {
            case "name":
                validarCampo(e.target, 'name');
                break;
            case "descripcion":
                validarCampo(e.target, 'desc');
                break;
        }

    }

    const validarExt = () =>{
        let card = document.querySelector(`p.error-myFile`);
        let archivoInput = document.getElementById('myFile');
        // console.log(archivoInput.files);
        let extPermitidas =  ["jpg", "png", "jpeg"];
        if (archivoInput.files.length == 3) {
            [...archivoInput.files].forEach(img => {
                let ext = img.name.split(".")[1]
                // console.log(ext);
                if (!extPermitidas.includes(ext)) {
                    
                    card.innerHTML = `el archivo no es valido`
                    card.style.margin = "revert"
                    campos[img] = false;
                } else {
                    card.innerHTML = ""
                    card.style.margin = "0"
                    campos[img] = true;
                }
            })
        } else {
            card.innerHTML = `3 archivos solamente`
            card.style.margin = "revert"
            campos[img] = false;
        }
    }

    
    const validarCampo = (input, campo) => {
        let card = document.querySelector(`p.error-${campo}`);
        card.innerHTML = ""
        if (input.value == "") {
            card.innerHTML = `el campo ${input.name} no puede estar vacio`
            card.style.margin = "revert"
            campos[campo] = false
        } else if ( input.name == "descripcion" && input.value.length < 20){
            card.innerHTML = `el campo ${input.name} debe tener 20 caracteres`
            card.style.margin = "revert"
            campos[campo] = false

        } else if ( input.name == "name" && input.value.length < 5){
            card.innerHTML = `el campo ${input.name} debe tener 5 caracteres`
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
        console.log(campos);
        if (!(campos.name && campos.desc && campos.img)) {
            e.preventDefault();
        }



    });

})