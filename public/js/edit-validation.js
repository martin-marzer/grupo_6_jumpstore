window.addEventListener("load", () => {

	let url = window.location.href
	let prevURL = document.referrer;

    if (url != prevURL) {

    const form = document.querySelector("form.formulario-edit")

    let inputs = document.querySelectorAll("form.formulario-edit input");
    let textarea = document.querySelector("textarea")


    const campos = {
        name: false,
        desc: false,
        precio: false,
        descuento: false,
        stock: false,
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



    const validarCampo = (input, campo) => {
        let card = document.querySelector(`p.error-${campo}`);
        card.innerHTML = ""
        card.style.color = "#FF4F4F"
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
        if (!(campos.name && campos.desc && campos.precio && campos.descuento && campos.stock)) {
            e.preventDefault();
        }
    });

    }
   
})