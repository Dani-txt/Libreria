// Recuperar opiniones desde localStorage o inicializar vacío
let opiniones = JSON.parse(localStorage.getItem("opiniones")) || [];

// Mostrar formulario solo si es cliente
window.addEventListener("load", function () {
    let usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    let formOpinion = document.getElementById("formularioOpinion");

    if (usuarioActivo && usuarioActivo.tipoUsuario === "cliente") {
        formOpinion.style.display = "block";
    }

    mostrarOpiniones();
});

// Función para publicar una opinión
function publicarOpinion() {
    let usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    let texto = document.getElementById("textoOpinion").value.trim();

    if (!usuarioActivo || usuarioActivo.tipoUsuario !== "cliente") {
        alert("Debes iniciar sesión como cliente para publicar una opinión.");
        return;
    }
    if (texto === "") {
        alert("No puedes publicar una opinión vacía.");
        return;
    }

    let nuevaOpinion = {
        usuario: usuarioActivo.nombreUsuario,
        texto: texto,
        fecha: new Date().toLocaleString()
    };
    opiniones.push(nuevaOpinion);
    localStorage.setItem("opiniones", JSON.stringify(opiniones));
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
    opiniones.forEach(op => {
        let opinionDiv = document.createElement("div");
        opinionDiv.classList.add("opinion");
        opinionDiv.innerHTML = `
        <p><strong>${op.usuario}</strong> (${op.fecha}):</p>
        <p>${op.texto}</p>
        <hr>
        `;
        listaDiv.appendChild(opinionDiv);
    });
}
