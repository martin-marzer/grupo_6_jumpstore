window.addEventListener("load", () => {
    const form = document.querySelector("form.formulario-edit")


    let inputs = document.querySelectorAll("form.formulario-edit input");
    let textarea = document.querySelector("textarea")


    const campos = {
        name: false,
        desc: false
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

    form.addEventListener('submit', (e) => {
        if (!(campos.name && campos.desc)) {
            e.preventDefault();
        }
    });

})