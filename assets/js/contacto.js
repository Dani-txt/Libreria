   // Función para validar nombre
function validarNombre(nombre){
    if(nombre.length < 3 || nombre.length > 100){
        alert("El nombre debe tener al menos 3 caracteres y máximo 100");
        return false;
    }
    return true;
}

// Función para validar email
function validarEmail(email) {
    if (!email.includes("@duoc.cl") && !email.includes("@profesor.duoc.cl") && !email.includes("@gmail.cl")) {
        alert("El email debe contener @duoc.cl, @profesor.duoc.cl o @gmail.cl");
        return false;
    }
    return true;
}

//funcion para validar mensaje
function validarMensaje(mensaje){
    if (mensaje === "") {
        alert("Este campo no puede estar vacío (mensaje)");
        return false;
    }
    return true;
}

//funcion que recibe el formulario, valida datos y luego envía el mensaje
function enviarContacto(){
    let nombre = document.getElementById("nombre").value;
    let email = document.getElementById("email").value;
    let mensaje = document.getElementById("mensaje").value;

    if(validarNombre(nombre) == true && validarEmail(email) == true && validarMensaje(mensaje) == true){
        alert("Mensaje enviado");
        // Vaciar los campos
        document.getElementById("nombre").value = "";
        document.getElementById("email").value = "";
        document.getElementById("mensaje").value = "";
    }else{
        alert("Error, intentalo de nuevo")
    }
}


