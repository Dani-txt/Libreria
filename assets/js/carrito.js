let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarAlCarrito(indiceLibro) {
    let usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    if(!usuarioActivo || usuarioActivo.tipoUsuario !== "cliente"){
        alert("Sólo los clientes pueden agregar libros al carrito.");
        return;
    }
    carrito.push(Libros[indiceLibro]);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert("Libro agregado al carrito");
    mostrarCarrito(); // Actualiza el carrito automáticamente
}

//calculando la venta del carrito
function calcularSubtotalCarrito() {
    return Math.round(carrito.reduce((total, libro) => total + parseFloat(libro.precio), 0));
}

function calcularIVA(subtotal) {
    return Math.round(subtotal * 0.19);
}

function calcularTotalConIVA(subtotal) {
    return Math.round(subtotal + calcularIVA(subtotal));
}

// Función para generar el carrito de compras
function mostrarCarrito() {
    let carritoDiv = document.getElementById("carrito");
    carritoDiv.innerHTML = "";
    let botonComprar = document.getElementById("botonComprar");
    if (carrito.length === 0) {
        carritoDiv.innerHTML += "<p>El carrito está vacío.</p>";
        if(botonComprar) botonComprar.style.display = "none";
        return;
    }
    carrito.forEach((libro, index) => {
        carritoDiv.innerHTML += `
            <div>
                <h3>${libro.titulo}</h3>
                <p><strong>Precio:</strong> $${libro.precio}</p>
                <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
            </div>
            <hr>
        `;
    });
    let subtotal = calcularSubtotalCarrito();
    let iva = calcularIVA(subtotal);
    let total = calcularTotalConIVA(subtotal);

    carritoDiv.innerHTML += `
        <h4>Subtotal: $${subtotal.toFixed(2)}</h4>
        <h4>IVA (19%): $${iva.toFixed(2)}</h4>
        <h3>Total: $${total.toFixed(2)}</h3>
    `;

    //Confirmación de que el boton comprar sólo se muestra si es cliente
    let usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (botonComprar) {
        if (usuarioActivo && usuarioActivo.tipoUsuario === "cliente") {
            botonComprar.style.display = "inline-block";
        } else {
            botonComprar.style.display = "none";
        }
    }
}

function eliminarDelCarrito(indice) {
    carrito.splice(indice, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

window.addEventListener("load", function() {
    let usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (usuarioActivo && usuarioActivo.tipoUsuario === "cliente") {
        document.querySelector(".carritoSection").style.display = "block";
    }
    mostrarCarrito();
});

function comprarCarrito() {
    let usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!usuarioActivo || usuarioActivo.tipoUsuario !== "cliente") {
        alert("Debes iniciar sesión como cliente para comprar");
        return;
    }
    if (carrito.length === 0) {
        alert("El carrito está vacío");
        return;
    }
    alert("Compra realizada con éxito");
    carrito = [];
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}