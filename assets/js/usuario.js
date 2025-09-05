let usuarios = [];

//valido que el nombre contenga entre 3 y 20 caracteres (Quizá despues tengamos qe modificar para que sólo acepte letras)
function validarNombre(nombre){
    if(nombre.length < 3 || nombre.length > 20){
        alert("El nombre debe tener al menos 3 caracteres y máximo 20");
        return false;
    }
    return true;
}

//Valido que el email contenga @ y .
function validarEmail(email) {
    if (!email.includes("@") || !email.includes(".")) {
        alert("El email debe contener un '@' y un '.'");
        return false;
    }
    return true;
}

//Valido que la contraseña tenga al menos 6 caracteres (Supongo que después tendremos que agregarle la parte en que debemos confirmar la contraseña y que ambas coincidan)
function validarContrasenia(contrasenia, confirmarContrasenia) {
    if (contrasenia.length < 6 && contrasenia != confirmarContrasenia) {
        alert("La contraseña debe tener al menos 6 caracteres");
        return false;
    }
    return true;
}

//confirmo que el nombre de usuario no esté en la lista (para evitar duplicaión de usuarios)
function confirmarNombreUsuario(nombre) {
    for (let usuario of usuarios) {
        if (usuario.nombre === nombre) {
            alert("el nombre de usuario ya existe, prueba con otro")
            return false;
        }
    }
    return true;
}

//Acá junto todas las validaciones y si son correctas se agrega al usuario a la lista
function registrarUsuario() {
    let nombre = document.getElementById("nombre").value;
    let email = document.getElementById("email").value;
    let contrasenia = document.getElementById("contrasenia").value;
    let confirmarContrasenia = document.getElementById("confirmarContrasenia").value;
    let tipoUsuario = document.getElementById("tipoUsuario").value;

    if (validarNombre(nombre) == true && validarEmail(email) == true && validarContrasenia(contrasenia) == true && confirmarNombreUsuario(nombre) == true) {
        let usuario = {
            nombre: nombre,
            email: email,
            tipoUsuario: tipoUsuario,
            contrasenia: contrasenia,
            confirmarContrasenia: confirmarContrasenia
        };
        usuarios.push(usuario);
        alert("Usuario registrado exitosamente");
        console.log(usuarios);
        document.getElementById("nombre").value = "";
        document.getElementById("email").value = "";
        document.getElementById("contrasenia").value = "";
        document.getElementById("confirmarContrasenia").value = "";
        document.getElementById("tipoUsuario").value = "cliente";
    }
}

// Función para mostrar el perfil y el botón de cerrar sesión
function mostrarPerfilUsuario() {
    let usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (usuarioActivo) {
        document.getElementById("perfilUsuario").style.display = "block";
        document.getElementById("nombreUsuario").textContent = 
            `Bienvenido, ${usuarioActivo.nombre} (${usuarioActivo.tipoUsuario})`;
    } else {
        document.getElementById("perfilUsuario").style.display = "none";
    }
}

//Funcion para iniciar sesión
function iniciarSesion() {
    let email = document.getElementById("emailLogin").value;
    let contrasenia = document.getElementById("contraseniaLogin").value;

    for (let usuario of usuarios) {
        if (usuario.email == email && usuario.contrasenia == contrasenia) {
            alert("Inicio de sesión exitoso");
            alert(`Usuario logueado: ${usuario.nombre} (${usuario.tipoUsuario})`);
            // Guardar usuario activo en localStorage
            localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
            mostrarPerfilUsuario();
            document.getElementById("emailLogin").value = "";
            document.getElementById("contraseniaLogin").value = "";
            return;
        }
    }
    alert("Nombre de usuario o contraseña incorrectos");
}

window.addEventListener("load", function() {
    mostrarPerfilUsuario();
});

function cerrarSesion() {
    localStorage.removeItem("usuarioActivo");
    mostrarPerfilUsuario();
    // Opcional: recargar o redirigir
    location.reload();
}