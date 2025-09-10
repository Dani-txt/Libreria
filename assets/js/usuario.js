let usuarios = [];
//Local storage sólo guarda texto. Por ende se creará un array de usuarios y será manipulado como JSON (Clave: valor))
//localStorage.setItem('usuarios', JSON.stringify(usuarios));
//Ahi estoy diciendo que el almacenamiento local guarde el array usuarios como un string JSON

// Cargar usuarios desde localStorage si existen
document.addEventListener("DOMContentLoaded", function () {
    const usuariosGuardados = localStorage.getItem("usuarios");
    if (usuariosGuardados) {
        // Parsear el string almacenado en formato: nombre|email|tipo|contrasenia,...
        const usuariosArray = usuariosGuardados.split(",");
        for (let i = 0; i < usuariosArray.length; i++) {
            const usuarioData = usuariosArray[i].split("|");
            if (usuarioData.length === 4) {
                usuarios.push({
                    nombre: usuarioData[0],
                    email: usuarioData[1],
                    tipoUsuario: usuarioData[2],
                    contrasenia: usuarioData[3],
                });
            }
        }
    }
    mostrarPerfilUsuario();
    //mostrarUsuariosRegistrados();
});

// Función para guardar usuarios en localStorage
function guardarUsuarios() {
    // Crear un string con formato: nombre|email|tipo|contrasenia,...
    let usuariosString = "";
    for (let i = 0; i < usuarios.length; i++) {
        const usuario = usuarios[i];
        usuariosString += `${usuario.nombre}|${usuario.email}|${usuario.tipoUsuario}|${usuario.contrasenia}`;
        if (i < usuarios.length - 1) {
            usuariosString += ",";
        }
    }
    localStorage.setItem("usuarios", usuariosString);
}

// Función para validar nombre
function validarNombre(nombre) {
    if (nombre.length < 3 || nombre.length > 100) {
        alert("El nombre debe tener al menos 3 caracteres y máximo 100");
        return false;
    }
    return true;
}

// Función para validar email
function validarEmail(email) {
    if (
        !email.includes("@duoc.cl") &&
        !email.includes("@profesor.duoc.cl") &&
        !email.includes("@gmail.cl")
    ) {
        alert("El email debe contener @duoc.cl, @profesor.duoc.cl o @gmail.cl");
        return false;
    }
    return true;
}

// Función para validar contraseña
function validarContrasenia(contrasenia, confirmarContrasenia) {
    if (contrasenia.length < 4 || contrasenia.length > 10) {
        alert("La contraseña debe tener al menos 4 caracteres y maximo 10");
        return false;
    }

    if (contrasenia !== confirmarContrasenia) {
        alert("Las contraseñas no coinciden");
        return false;
    }

    return true;
}

// Función para confirmar que el nombre de usuario no existe
function confirmarEmailUsuario(email) {
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].email === email) {
            alert("El correo de usuario ya existe, prueba con otro");
            return false;
        }
    }
    return true;
}

// Función para registrar usuario
function registrarUsuario() {
    let nombre = document.getElementById("nombre").value;
    let email = document.getElementById("email").value;
    let tipoUsuario = document.getElementById("tipoUsuario").value;
    let contrasenia = document.getElementById("contrasenia").value;
    let confirmarContrasenia = document.getElementById("confirmarContrasenia").value;
    if (
        validarNombre(nombre) &&
        validarEmail(email) &&
        confirmarEmailUsuario(email) &&
        validarContrasenia(contrasenia, confirmarContrasenia)
    ) {
        let usuario = { nombre, email, tipoUsuario, contrasenia };
        usuarios.push(usuario);
        guardarUsuarios();
        alert("Usuario registrado exitosamente");
        // Limpiar formulario
        document.getElementById("nombre").value = "";
        document.getElementById("email").value = "";
        document.getElementById("contrasenia").value = "";
        document.getElementById("confirmarContrasenia").value = "";
        document.getElementById("tipoUsuario").value = "cliente";
        // Actualizar lista de usuarios
        //mostrarUsuariosRegistrados();
    }
}

// Función para iniciar sesión
function iniciarSesion() {
    let email = document.getElementById("emailLogin").value;
    let contrasenia = document.getElementById("contraseniaLogin").value;

    for (let i = 0; i < usuarios.length; i++) {
        if (
            usuarios[i].email === email &&
            usuarios[i].contrasenia === contrasenia
        ) {
            alert("Inicio de sesión exitoso");
            alert(
                `Usuario logueado: ${usuarios[i].nombre} (${usuarios[i].tipoUsuario})`
            );

            // Guardar usuario activo en localStorage
            localStorage.setItem("usuarioActivoNombre", usuarios[i].nombre);
            localStorage.setItem("usuarioActivoEmail", usuarios[i].email);
            localStorage.setItem("usuarioActivoTipo", usuarios[i].tipoUsuario);

            // Actualizar interfaz
            mostrarPerfilUsuario();

            // Limpiar formulario
            document.getElementById("emailLogin").value = "";
            document.getElementById("contraseniaLogin").value = "";

            return;
        }
    }
    alert("Nombre de usuario o contraseña incorrectos");
}

// Función para mostrar perfil de usuario
function mostrarPerfilUsuario() {
    const nombre = localStorage.getItem("usuarioActivoNombre");
    const tipo = localStorage.getItem("usuarioActivoTipo");
    const perfilUsuario = document.getElementById("perfilUsuario");

    if (nombre && tipo) {
        perfilUsuario.classList.remove("hidden");
        perfilUsuario.classList.add("visible");
        document.getElementById(
            "nombreUsuario"
        ).textContent = `Bienvenido, ${nombre} (${tipo})`;
    } else {
        perfilUsuario.classList.remove("visible");
        perfilUsuario.classList.add("hidden");
    }
    actualizarBotonLogin();
}

// Función para cerrar sesión
function cerrarSesion() {
    localStorage.removeItem("usuarioActivoNombre");
    localStorage.removeItem("usuarioActivoEmail");
    localStorage.removeItem("usuarioActivoTipo");
    mostrarPerfilUsuario();
    alert("Sesión cerrada correctamente");
    location.reload();
}

// Función para mostrar usuarios registrados (solo para prueba)
/*function mostrarUsuariosRegistrados() {
    //const panel = document.getElementById("usuariosRegistradosPanel");
    const lista = document.getElementById("usuariosLista");

    if (usuarios.length > 0) {
        panel.classList.remove("hidden")
        lista.innerHTML = "";

        for (let i = 0; i < usuarios.length; i++) {
            const usuario = usuarios[i];
            const usuarioElement = document.createElement("div");
            usuarioElement.classList.add("user-info");
            usuarioElement.innerHTML = `
                <p><strong>Nombre:</strong> ${usuario.nombre}</p>
                <p><strong>Email:</strong> ${usuario.email}</p>
                <p><strong>Tipo:</strong> ${usuario.tipoUsuario}</p>
            `;
            lista.appendChild(usuarioElement);
        }
    } else {
        panel.classList.add("hidden");
    }
}*/

//Funcion para ocultar y mostrar el botn de inicio de sesion
function actualizarBotonLogin() {
    const nombre = localStorage.getItem("usuarioActivoNombre");
    const tipo = localStorage.getItem("usuarioActivoTipo");
    const loginButton = document.getElementById("loginButton");

    if (nombre && tipo && loginButton) {
        // Usuario logueado - ocultar botón de login
        loginButton.style.display = "none";
    } else if (loginButton) {
        // Usuario no logueado - mostrar botón de login
        loginButton.style.display = "block";
    }
}
