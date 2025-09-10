// Cargar carrito desde localStorage
let carrito = [];
let carritoGuardado = localStorage.getItem("carrito");
if (carritoGuardado) {
    // Parsear el string almacenado en formato: titulo|autor|precio|imagen|descripcion,...
    const carritoArray = carritoGuardado.split(';');
    for (let i = 0; i < carritoArray.length; i++) {
        const libroData = carritoArray[i].split('|');
        if (libroData.length >= 5) {
            carrito.push({
                titulo: libroData[0],
                autor: libroData[1],
                precio: parseFloat(libroData[2]),
                imagen: libroData[3],
                descripcion: libroData[4],
                cantidad: libroData.length > 5 ? parseInt(libroData[5]) : 1
            });
        }
    }
}

// Función para guardar carrito en localStorage
function guardarCarrito() {
    let carritoString = '';
    for (let i = 0; i < carrito.length; i++) {
        const libro = carrito[i];
        carritoString += `${libro.titulo}|${libro.autor}|${libro.precio}|${libro.imagen}|${libro.descripcion}|${libro.cantidad}`;
        if (i < carrito.length - 1) {
            carritoString += ';';
        }
    }
    localStorage.setItem("carrito", carritoString);
}

//function para agregar elementos al carrito
function agregarAlCarrito(indiceLibro) {
    let usuarioActivoNombre = localStorage.getItem("usuarioActivoNombre");
    let usuarioActivoTipo = localStorage.getItem("usuarioActivoTipo");
    //Verificacion de que sólo los clientes pueden agregar elementos al carrito
    if(!usuarioActivoNombre || usuarioActivoTipo !== "cliente"){
        alert("Sólo los clientes pueden agregar libros al carrito.");
        return;
    }
    // Obtener el libro del catálogo
    const libro = Libros[indiceLibro];
    
    // Buscar si el libro ya está en el carrito
    let libroExistenteIndex = -1;
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].titulo === libro.titulo && carrito[i].autor === libro.autor) {
            libroExistenteIndex = i;
            break;
        }
    }

    if (libroExistenteIndex !== -1) {
        // Si el libro ya existe, aumentar la cantidad
        carrito[libroExistenteIndex].cantidad += 1;
    } else {
        // Si el libro no existe, agregarlo con cantidad 1
        carrito.push({
            titulo: libro.titulo,
            autor: libro.autor,
            precio: libro.precio,
            imagen: libro.imagen,
            descripcion: libro.descripcion,
            cantidad: 1
        });
    }

    guardarCarrito();
    alert("Libro agregado al carrito");
    //mostar el carrito automaticamente
    if(carritoVisible == false){
        mostrarCarrito();
    }else{
        mostrarCarrito();
    }
    
}

// funciones para calcular la venta del carrito
function calcularSubtotalCarrito() {
    let total = 0;
    for (let i = 0; i < carrito.length; i++) {
        total += parseFloat(carrito[i].precio) * carrito[i].cantidad;
    }
    return Math.round(total);
}

function calcularIVA(subtotal) {
    return Math.round(subtotal * 0.19);
}

function calcularTotalConIVA(subtotal) {
    return Math.round(subtotal + calcularIVA(subtotal));
}

// Función para generar el carrito de compras
let carritoVisible = false;
function mostrarCarrito() {
    let carritoDiv = document.getElementById("carrito");
    let botonCarrito = document.getElementById("botonCarrito")
    let botonComprar = document.getElementById("botonComprar");

    //si el carrito está visible, lo oculta
    if(carritoVisible == true){
        carritoDiv.innerHTML = "";
        botonCarrito.textContent = "Mostrar Carrito";
        carritoVisible = false;
        return;
    }
    //Ahora se muestra el carrito
    carritoDiv.innerHTML = "";

    if (carrito.length === 0) {
        carritoDiv.innerHTML += "<p>El carrito está vacío.</p>";
        if(botonComprar) botonComprar.style.display = "none";
    }else{
        for (let i = 0; i < carrito.length; i++) {
            let libro = carrito[i];
            carritoDiv.innerHTML += `
                <div class="item-carrito">
                    <h3>${libro.titulo}</h3>
                    <p><strong>Autor:</strong> ${libro.autor}</p>
                    <p><strong>Precio unitario:</strong> $${libro.precio}</p>
                    <p><strong>Cantidad:</strong> ${libro.cantidad}</p>
                    <button onclick="aumentarCantidad(${i})"> + </button>
                    <button onclick="disminuirCantidad(${i})"> - </button>
                    <button onclick="eliminarDelCarrito(${i})">Eliminar</button>
                </div>
                <p><strong>Subtotal:</strong> $${(libro.precio * libro.cantidad).toFixed(2)}</p>
                <hr>
            `;
        }
        let subtotal = calcularSubtotalCarrito();
        let iva = calcularIVA(subtotal);
        let total = calcularTotalConIVA(subtotal);

        carritoDiv.innerHTML += `
            <h4>Subtotal: $${subtotal.toFixed(2)}</h4>
            <h4>IVA (19%): $${iva.toFixed(2)}</h4>
            <h3>Total: $${total.toFixed(2)}</h3>
        `;
    // Confirmación de que el boton comprar sólo se muestra si es cliente
        let usuarioActivoNombre = localStorage.getItem("usuarioActivoNombre");
        let usuarioActivoTipo = localStorage.getItem("usuarioActivoTipo");
        
        if (botonComprar) {
            if (usuarioActivoNombre && usuarioActivoTipo === "cliente") {
                botonComprar.style.display = "inline-block";
            } else {
                botonComprar.style.display = "none";
            }
        }
    }
    botonCarrito.textContent ="Ocultar Carrito"
    carritoVisible = true;
}

//Function para eliminar elementos del carrito
function eliminarDelCarrito(indice) {
    carrito.splice(indice, 1);
    guardarCarrito();
    if(carritoVisible){
        mostrarCarrito();
    }

}

//Function para verificar que el usuario activo sea cliente (el admin no puede comprar)
window.addEventListener("load", function() {
    let usuarioActivoNombre = localStorage.getItem("usuarioActivoNombre");
    let usuarioActivoTipo = localStorage.getItem("usuarioActivoTipo");
    
    if (usuarioActivoNombre && usuarioActivoTipo === "cliente") {
        document.querySelector(".carritoSection").style.display = "block";
    }
    mostrarCarrito();
});

//Function para comprar el carrito, verifico que el cliente inicie sesión y que no esté vacío
function comprarCarrito() {
    let usuarioActivoNombre = localStorage.getItem("usuarioActivoNombre");
    let usuarioActivoTipo = localStorage.getItem("usuarioActivoTipo");
    
    if (!usuarioActivoNombre || usuarioActivoTipo !== "cliente") {
        alert("Debes iniciar sesión como cliente para comprar");
        return;
    }
    
    if (carrito.length === 0) {
        alert("El carrito está vacío");
        return;
    }
    
    alert("Compra realizada con éxito");
    carrito = [];
    guardarCarrito();
    mostrarCarrito();
}


// Función para aumentar la cantidad de un producto
function aumentarCantidad(indice) {
    carrito[indice].cantidad += 1;
    guardarCarrito();
    if(carritoVisible){
        mostrarCarrito();
    }
}

// Función para disminuir la cantidad de un producto
function disminuirCantidad(indice) {
    if (carrito[indice].cantidad > 1) {
        carrito[indice].cantidad -= 1;
        guardarCarrito();
        if(carritoVisible){
            mostrarCarrito();
        }
    } else {
        eliminarDelCarrito(indice);
        return;
    }


}
