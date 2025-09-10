// Recuperar opiniones desde localStorage o inicializar vacío
let opiniones = [];
cargarOpiniones();

// Cargar desde arrays separados
function cargarOpiniones() {
    opiniones = [];
    const usuarios = localStorage.getItem("opiniones_usuarios");
    const textos = localStorage.getItem("opiniones_textos");
    const fechas = localStorage.getItem("opiniones_fechas");
    
    if (usuarios && textos && fechas) {
        const usuariosArray = usuarios.split('|');
        const textosArray = textos.split('|');
        const fechasArray = fechas.split('|');
        
        // compruebo que todos lso array son iguales
        const minLength = Math.min(usuariosArray.length, textosArray.length, fechasArray.length);
        
        for (let i = 0; i < minLength; i++) {
            opiniones.push({
                usuario: usuariosArray[i],
                texto: textosArray[i],
                fecha: fechasArray[i]
            });
        }
    }
}

// Función para guardar opiniones en localStorage
function guardarOpiniones() {
    const usuarios = [];
    const textos = [];
    const fechas = [];
    
    for (let i = 0; i < opiniones.length; i++) {
        usuarios.push(opiniones[i].usuario);
        textos.push(opiniones[i].texto);
        fechas.push(opiniones[i].fecha);
    }
    
    localStorage.setItem("opiniones_usuarios", usuarios.join('|'));
    localStorage.setItem("opiniones_textos", textos.join('|'));
    localStorage.setItem("opiniones_fechas", fechas.join('|'));
}




// Mostrar formulario solo si es cliente
window.addEventListener("load", function () {
    let usuarioActivoNombre = localStorage.getItem("usuarioActivoNombre");
    let usuarioActivoTipo = localStorage.getItem("usuarioActivoTipo");
    let formOpinion = document.getElementById("formularioOpinion");

    if (usuarioActivoNombre && usuarioActivoTipo === "cliente") {
        formOpinion.style.display = "block";
    }else{
        formOpinion.style.display="none"
    }

    mostrarOpiniones();
});

// Función para publicar una opinión
function publicarOpinion() {
    let usuarioActivoNombre = localStorage.getItem("usuarioActivoNombre");
    let usuarioActivoTipo = localStorage.getItem("usuarioActivoTipo");
    let texto = document.getElementById("textoOpinion").value.trim();

    if (usuarioActivoTipo !== "cliente") {
        alert("Debes iniciar sesión como cliente para publicar una opinión.");
        return;
    }
    if (texto === "") {
        alert("No puedes publicar una opinión vacía.");
        return;
    }

    let nuevaOpinion = {
        usuario: usuarioActivoNombre,
        texto: texto,
        fecha: new Date().toLocaleString() //La fecha será la local y transformada a String
    };
    
    opiniones.push(nuevaOpinion);
    guardarOpiniones();
    document.getElementById("textoOpinion").value = "";
    mostrarOpiniones();
}

// Mostrar todas las opiniones
function mostrarOpiniones() {
    let listaDiv = document.getElementById("listaOpiniones");
    listaDiv.innerHTML = "";
    
    if (opiniones.length === 0) {
        listaDiv.innerHTML = "<p>No hay opiniones aún.</p>";
        return;
    }
    
    for (let i = 0; i < opiniones.length; i++) {
        let op = opiniones[i];
        let opinionDiv = document.createElement("div");
        opinionDiv.classList.add("opinion");
        opinionDiv.innerHTML = `
        <p><strong>${op.usuario}</strong> (${op.fecha}):</p>
        <p>${op.texto}</p>
        <hr>
        `;
        listaDiv.appendChild(opinionDiv);
    }
}

