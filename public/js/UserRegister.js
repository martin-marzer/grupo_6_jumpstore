window.addEventListener("load", () => {
	let url = window.location.href
	let prevURL = document.referrer;
	let urlArr = window.location.pathname.split("/")
	let prevURLArr = document.referrer.split("/");
	if (urlArr.includes("register")) {

		terminosCB = document.querySelector("#terminos");

		if (!prevURLArr.includes("register")) {
			terminosCB.checked = false
		}
		else if (prevURLArr.includes("register")) {
			terminosCB.checked = true
		}
	}

	if (url != prevURL) {
		console.log(url);
		console.log(prevURL);
		const formulario = document.getElementById('formulario');
		const inputs = document.querySelectorAll('#formulario input');

		const expresiones = {
			username: /^[a-zA-Z0-9\_\-]{5,30}$/, // Letras, numeros, guion y guion_bajo
			password: /^.{4,20}$/, // 4 a 12 digitos.
			email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
		}

		const campos = {
			username: false,
			password: false,
			email: false,
		}

		const validarFormulario = (e) => {
			switch (e.target.name) {
				case "username":
					validarCampo(expresiones.username, e.target, 'username');
					break;
				case "password":
					validarCampo(expresiones.password, e.target, 'password');
					break;
				case "email":
					validarCampo(expresiones.email, e.target, 'email');
					break;
			}
		}

		const validarCampo = (expresion, input, campo) => {
			let text = document.querySelector(`#grupo__${campo} .formulario__input-error`)
			text.style.color = "#FF4F4F"
			if (input.value == "") {
				document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
				document.querySelector(`#grupo__${campo} i.formulario__validacion-estado`).classList.add('fa-times-circle');
				text.innerHTML = `el campo ${campo} no puede estar vacio`;
				document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
			}
			else if (expresion.test(input.value)) {
				document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
				document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
				document.querySelector(`#grupo__${campo} i.formulario__validacion-estado`).classList.add('fa-check-circle');
				document.querySelector(`#grupo__${campo} i.formulario__validacion-estado`).classList.remove('fa-times-circle');
				document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
				campos[campo] = true;
			} else {
				document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
				document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
				document.querySelector(`#grupo__${campo} i.formulario__validacion-estado`).classList.add('fa-times-circle');
				document.querySelector(`#grupo__${campo} i.formulario__validacion-estado`).classList.remove('fa-check-circle');
				if (input.name == "email") {
					text.innerHTML = "El correo debe ser valido"
				}
				if (input.name == "username") {
					text.innerHTML = "El usuario tiene que ser de 5 a 50 dígitos y solo puede contener numeros, letras y guion bajo."
				}
				if (input.name == "password") {
					text.innerHTML = "La contraseña tiene que ser de 4 a 20 dígitos."
				}
				document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
				campos[campo] = false;
			}
		}


		inputs.forEach((input) => {
			input.addEventListener('keyup', validarFormulario);
			input.addEventListener('blur', validarFormulario);
		});

		formulario.addEventListener('submit', (e) => {
			if (url.includes("register")) {
				if (terminosCB.checked == false && !(campos.username && campos.password && campos.email)) {
					e.preventDefault();
				}
			} else if (url.includes("login")) {
				if (!(campos.password && campos.email)) {
					e.preventDefault();
				}
			}


		});
	}


})

