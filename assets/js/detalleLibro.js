document.addEventListener("DOMContentLoaded", function() {
    let idLibro = localStorage.getItem("libroSeleccionado");

    if (idLibro == false) {
        document.getElementById("detalleContenido").innerHTML = "<p>No se encontró el libro.</p>";
        return;
    }

        // Buscar libro en el catálogo
    let libro = Libros.find(l => l.id == idLibro);

    if (libro == false) {
        document.getElementById("detalleContenido").innerHTML = "<p>No se encontró el libro.</p>";
        return;
    }

    document.getElementById("detalleContenido").innerHTML = `
        <h3>${libro.titulo}</h3>
        <p><strong>Autor:</strong> ${libro.autor}</p>
        <p><strong>Precio:</strong> $${libro.precio}</p>
        <p><strong>Descripción:</strong> ${libro.descripcion}</p>
        <img src="${libro.imagen}" alt="${libro.titulo}" width="150"><br>
        <button onclick="agregarAlCarrito(${Libros.indexOf(libro)})">Agregar al carrito</button>
    `;

    document.getElementById("detalleLibro").classList.remove("hidden");
});

// Botón cerrar
function cerrarDetalle() {
    window.location.href = "../html/libros.html";
}
