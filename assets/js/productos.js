let librosGuardados = localStorage.getItem("Libros");

let Libros = librosGuardados ? JSON.parse(librosGuardados) : [
    {
        titulo: "La biblia. El nuevo testamento",
        autor: "Los apostoles",
        precio: 3333,
        imagen: "../assets/img/laBiblia.webp",
        descripcion: "Es la biblia pero con dibujitos."
    },
    {
        titulo: "Curso de Programacion: Android con Kotlin",
        autor: ":Antonio Javier Gallego Sánchez, Miguel Ángel Lozano Ortega",
        precio: 28000,
        imagen: "../assets/img/kotlin.webp",
        descripcion: "Contiene los poderosos hechizos para crear apps en android."
    },
    {
        titulo: "H. P. Lovecraft I",
        autor: "H. P. Lovecraft",
        precio: 18500,
        imagen: "../assets/img/lovecraft.webp",
        descripcion: " primer volumen de la colección completa de las obras de ficción y terror de Howard Phillips Lovecraft"
    },
    {
        titulo: "Hunter x Hunter vol 1",
        autor: "Yoshihiro Togashi",
        precio: 15250,
        imagen: "../assets/img/hunterx.webp",
        descripcion: "Gon Freecss es un niño de 12 años que descubre que su padre, a quien creía muerto, es en realidad un legendario Cazador. Debe buscarlo y en el proceso se agarra a madrazos"
    }
];

// capturando al usuario activo -> necesario para validar si es admin o cliente  y pueda comprar libros
function obtenerUsuarioActivo() {
    let usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (usuarioActivo.tipoUsuario == "admin"){

    }
}

/*Función constructora para crear objetos de tipo libro, no lo hemos visto,
queda al pendiente de comentario del profesor, de momento sólo una idea
function Libro(titulo, autor, precio, imagen, descripcion) {
    this.autor = autor;
    this.precio = precio;
    this.imagen = imagen;
    this.descripcion = descripcion;
    this.titulo = titulo;
}*/

//Función para agregar un libro a la lista de libros
function agregarLibro() {
    let usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!usuarioActivo || usuarioActivo.tipoUsuario !== "admin") {
        alert("No tienes permisos para agregar libros.");
        return;
    }
    let titulo = document.getElementById("titulo").value;
    let autor = document.getElementById("autor").value;
    let precio = document.getElementById("precio").value;
    let imagen = document.getElementById("imagen").value;
    let descripcion = document.getElementById("descripcion").value;
    let libro = {
        titulo: titulo,
        autor: autor,
        precio: precio,
        imagen: imagen,
        descripcion: descripcion
    };
    if (validarLibro(titulo, autor, precio, imagen, descripcion) == false) {
        alert("No se pudo agregar el libro, por favor verifica los datos");
        return;
    }
    Libros.push(libro);

    // Guarda la lista actualizada en localStorage
    localStorage.setItem("Libros", JSON.stringify(Libros));

    alert(`Libro agregado exitosamente:
        Título: ${titulo}
        Autor: ${autor}
        Precio: ${precio}
        Imagen: ${imagen}
        Descripción: ${descripcion}`);

    document.getElementById("titulo").value = "";
    document.getElementById("autor").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("imagen").value = "";
    document.getElementById("descripcion").value = "";
}

//funcion para validar el libro (en proceso)
function validarLibro(titulo, autor, precio, imagen, descripcion) {
    if (titulo === "" || autor === "" || precio === "" || imagen === "" || descripcion === "") {
        alert("Todos los campos son obligatorios");
        return false;
    }
    if (isNaN(precio) || precio <= 0) {
        alert("El precio debe ser mayor a 0 y un número válido");
        return false;
    }
    return true;
}

/* Precargar algunos libros al iniciar la página
function precargarLibros() {
    Libros.push(
        {
            titulo: "La biblia. El nuevo testamento",
            autor: "Los apostoles",
            precio: 3333,
            imagen: "../img/laBiblia.webp",
            descripcion: "Es la biblia pero con dibujitos."
        },
        {
            titulo: "Curso de Programacion: Android con Kotlin",
            autor: ":Antonio Javier Gallego Sánchez, Miguel Ángel Lozano Ortega",
            precio: 28000,
            imagen: "../img/kotlin.webp",
            descripcion: "Contiene los poderosos hechizos para crear apps en android."
        },
        {
            titulo: "H. P. Lovecraft I",
            autor: "H. P. Lovecraft",
            precio: 18500,
            imagen: "../img/lovecraft.webp",
            descripcion: " primer volumen de la colección completa de las obras de ficción y terror de Howard Phillips Lovecraft"
        },
        {
            titulo: "Hunter x Hunter vol 1",
            autor: "Yoshihiro Togashi",
            precio: 15250,
            imagen: "../img/hunterx.webp",
            descripcion: "Gon Freecss es un niño de 12 años que descubre que su padre, a quien creía muerto, es en realidad un legendario Cazador. Debe buscarlo y en el proceso se agarra a madrazos"
        }
    );
}
*/

//Función para mostrar el catálogo de libros
function mostrarCatalogo() {
    let catalogoDiv = document.getElementById("catalogo");
    catalogoDiv.innerHTML = ""; // limpiar antes de mostrar

    for (let i = 0; i <Libros.length; i++) {
        let libro = Libros[i];
        catalogoDiv.innerHTML += `
            <div>
                <h3>${libro.titulo}</h3>
                <p><strong>Autor:</strong> ${libro.autor}</p>
                <p><strong>Precio:</strong> $${libro.precio}</p>
                <p><strong>Descripción:</strong> ${libro.descripcion}</p>
                <img src="${libro.imagen}" alt="${libro.titulo}" width="100"><br>
                <button onclick="agregarAlCarrito(${i})">Agregar al carrito</button>
            </div>
            <hr>
        `;
    }
}

//Función para buscar libros por título o autor
function buscarLibro() {
    let texto = document.getElementById("buscarLibro").value.toLowerCase();
    let resultadoBusqueda = document.getElementById("resultadoBusqueda");
    resultadoBusqueda.innerHTML = "";

    if (texto.trim() === "") {
        resultadoBusqueda.innerHTML = "<p>Por favor ingresa un título o autor para buscar.</p>";
        return;
    }

    let encontrados = Libros.filter(libro =>
        libro.titulo.toLowerCase().includes(texto) ||
        libro.autor.toLowerCase().includes(texto)
    );

    if (encontrados.length === 0) {
        resultadoBusqueda.innerHTML = "<p>No se encontraron libros.</p>";
        return;
    }

    for (let libro of encontrados) {
        resultadoBusqueda.innerHTML += `
            <div>
                <h3>${libro.titulo}</h3>
                <p><strong>Autor:</strong> ${libro.autor}</p>
                <p><strong>Precio:</strong> $${libro.precio}</p>
                <p><strong>Descripción:</strong> ${libro.descripcion}</p>
                <img src="${libro.imagen}" alt="${libro.titulo}" width="100">
            </div>
            <hr>
        `;
    }
}

window.addEventListener("load", function() {
    let usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (usuarioActivo && usuarioActivo.tipoUsuario === "admin") {
        document.getElementById("agregarLibroSection").style.display = "block";
    } else {
        document.getElementById("agregarLibroSection").style.display = "none";
    }
});



