//Se establece la variable en local storage y el array de libros
let librosGuardados = localStorage.getItem("Libros");
let Libros =[
        {
            id: 1,
            titulo: "La biblia. El nuevo testamento",
            autor: "Los apostoles",
            precio: 3333,
            imagen: "../assets/img/laBiblia.webp",
            descripcion: "Es la biblia pero con dibujitos."
        },
        {
            id: 2,
            titulo: "Curso de Programacion: Android con Kotlin",
            autor: "Antonio Javier Gallego Sánchez, Miguel Ángel Lozano Ortega",
            precio: 28000,
            imagen: "../assets/img/kotlin.webp",
            descripcion: "Contiene los poderosos hechizos para crear apps en android."
        },
        {
            id: 3,
            titulo: "H. P. Lovecraft I",
            autor: "H. P. Lovecraft",
            precio: 18500,
            imagen: "../assets/img/lovecraft.webp",
            descripcion: "Primer volumen de la colección completa de las obras de ficción y terror de H.P. Lovecraft"
        },
        {
            id: 4,
            titulo: "Hunter x Hunter vol 1",
            autor: "Yoshihiro Togashi",
            precio: 15250,
            imagen: "../assets/img/hunterx.webp",
            descripcion: "Gon Freecss es un niño de 12 años que descubre que su padre es un legendario Cazador."
        }
    ];

if (librosGuardados) {
    // Convertir string en array de objetos
    const librosArray = librosGuardados.split(';');
    for (let i = 0; i < librosArray.length; i++) {
        const datos = librosArray[i].split('|');
        if (datos.length >= 6) {
            if(datos[0] != 1 && datos[0] != 2 && datos[0] !=3 && datos[0] !=4)
            Libros.push({
                id: datos[0],
                titulo: datos[1],
                autor: datos[2],
                precio: parseFloat(datos[3]),
                imagen: datos[4],
                descripcion: datos[5]
            });
        }
    }
}

// Obtener usuario activo del local storage
function obtenerUsuarioActivo() {
    let usuarioActivoNombre = localStorage.getItem("usuarioActivoNombre");
    let usuarioActivoTipo = localStorage.getItem("usuarioActivoTipo");
    
    if (usuarioActivoNombre && usuarioActivoTipo) {
        return {
            nombre: usuarioActivoNombre,
            tipoUsuario: usuarioActivoTipo
        };
    }
    return null;
}

// funcion para mostrar catalogo
let catalogoVisible = false;
function mostrarCatalogo() {
    let catalogoDiv = document.getElementById("catalogo");
    let catalogo = document.getElementById("catalogoBoton");

    if (!catalogoVisible){
        catalogoDiv.innerHTML = ""; // limpiar antes de mostrar
        for (let i = 0; i < Libros.length; i++) {
            let libro = Libros[i];
            catalogoDiv.innerHTML += `
                <div>
                    <h3>${libro.titulo}</h3>
                    <p><strong>Autor:</strong> ${libro.autor}</p>
                    <p><strong>Precio:</strong> $${libro.precio}</p>
                    <img src="${libro.imagen}" alt="${libro.titulo}" width="100"><br>
                    <button onclick="verDetalle(${i})">Ver detalle</button>
                    <button onclick="agregarAlCarrito(${i})">Agregar al carrito</button>
                </div>
                <hr>
            `;
        }
        catalogo.textContent = "Ocultar Catalogo";
        catalogoVisible = true;
    }else{
        catalogoDiv.innerHTML = "";
        catalogo.textContent ="Mostrar Catalogo";
        catalogoVisible = false;
    }
}

//function buscar libro por su nombre
function buscarLibro() {
    let texto = document.getElementById("buscarLibro").value.toLowerCase();
    let resultadoBusqueda = document.getElementById("resultadoBusqueda");
    resultadoBusqueda.innerHTML = "";

    if (texto.trim() === "") {
        resultadoBusqueda.innerHTML = "<p>Por favor ingresa un título o autor para buscar.</p>";
        return;
    }

    let encontrados = [];
    for (let i = 0; i < Libros.length; i++) {
        let libro = Libros[i];
        if (libro.titulo.toLowerCase().includes(texto) || libro.autor.toLowerCase().includes(texto)) {
            encontrados.push(libro);
        }
    }

    if (encontrados.length === 0) {
        resultadoBusqueda.innerHTML = "<p>No se encontraron libros.</p>";
        return;
    }

    for (let i = 0; i < encontrados.length; i++) {
        let libro = encontrados[i];
        resultadoBusqueda.innerHTML += `
            <div>
                <h3>${libro.titulo}</h3>
                <p><strong>Autor:</strong> ${libro.autor}</p>
                <p><strong>Precio:</strong> $${libro.precio}</p>
                <p><strong>Descripción:</strong> ${libro.descripcion}</p>
                <img src="${libro.imagen}" alt="${libro.titulo}" width="100">
                <button onclick="agregarAlCarrito(${Libros.indexOf(libro)})">Agregar al carrito</button>
            </div>
            <hr>
        `;
    }
}

function verDetalle(index) {
    let libro = Libros[index];
    // Guardar ID del libro en localStorage
    localStorage.setItem("libroSeleccionado", libro.id);
    // Redirigir a la página de detalle
    window.location.href = "../html/libro.html";
}

function cerrarDetalle() {
    document.getElementById("detalleLibro").classList.add("hidden");
}