
let nombresTorta, tiposTorta, tiposDeco;


function inicializarAplicacion(nombres, tipos, deco) {
    nombresTorta = nombres;
    tiposTorta = tipos;
    tiposDeco = deco;
    if (document.getElementById("tiposTorta")) {
        mostrarProductos();
    }
}

const mostrarProductos = () => {
    let contenidoHTML = "";

    for (const item of nombresTorta) {
        contenidoHTML += `<div class="card border-0 mb-3" style="width: 18rem;">
        <a href="tipotorta.html" class= "text-dark text-decoration-none" onclick="guardarIdProducto(${item.id})" >
            <img src="${item.imagen}" class="img-fluid" alt="${item.nombre}">
            <div class="card-body">
            <p class="card-text h4 text-center" style="font-size: xx-large ;font-weight: 200;">${item.nombre}</p>
          </div>
            
        </a>
        </div>`
    }
    document.getElementById("tiposTorta").innerHTML = contenidoHTML;
}
const guardarIdProducto = (id) => {
    localStorage.setItem("idnombresTorta", JSON.stringify(id));
}

const cargarIdProducto = () => {
    return JSON.parse(localStorage.getItem("idnombresTorta"));
}

const mensaje = (texto) => {
    Swal.fire({
        title: "Sweet!",
        text: "My cake ya es parte de la fiesta!",
        imageUrl: "images/logo.png",
        imageWidth: 150,
        imageHeight: 150,
        imageAlt: "Mycake"
    });
}

const errorCarga = (texto) => {
    Swal.fire("Ingresa el número de personas");
}

const errorCarga2 = (texto) => {
    Swal.fire("Por favor, hacer click en Calcular precio antes de enviar el pedido.");
}

const renderProducto = () => {
    const idProducto = cargarIdProducto();
    const producto = nombresTorta.find(item => item.id == idProducto);
    const tipoDecoKey = ['in', 'ad', 'cm', 'ba'][idProducto - 1];
    const decoOpciones = tiposDeco[tipoDecoKey];

    let contenidoHTML = `
        <div class="row">

             <div class="col-md-6">
                <img id="imagenPrincipal" src="${producto.imagen}" class="img-fluid mb-5 w-100" alt="${producto.nombre}"/>                
            </div>   

           
            <div class="col-md-6 ps-5">
                <select id="cantidadPorciones" class="form-select mb-4" aria-label="Default select example">
                    <option selected>¿Para cuántas personas es la torta?</option>
                    <option value="10">10 personas</option>
                    <option value="18">18 personas</option>
                    <option value="24">24 personas</option>
                    <option value="32">32 personas</option> 
                    <option>Por mayor cantidad consulte por privado</option>
                </select>

                <div class="card-body">
                    <button class="btn btn-info border-1 shadow p-3 mb-5 rounded tm-5 bm-5 text-white" onclick="mostrarPrecio()">Calcular precio</button>
                </div>

                <div class="mb-5">
                    <h4 id="nombre" style="font-size: xx-large; font-weight: 200;">${producto.base}</h4>
                    <h3 id="precioTotal" class="mt-5 mb-5" style="font-size: 2.5rem; font-weight: 300;">Precio total: $0</h3>
                </div>
                <div class="d-grid gap-8 d-md-block">
                    <button class="btn btn-info border-1 shadow p-3 mb-5 me-2 rounded tm-5 text-white" onclick="enviarPedido()" style="font-size: 1.1rem; font-weight: 700;" type="button">¡Enviar Pedido!</button> 
                    <button class="btn btn-body-color border-1 shadow p-3 mb-5 rounded tm-5 text-gray" onclick="resetPage()" style="font-size: 1.1rem; font-weight: 300;" type="button">reset</button>
                </div>
            </div>

            
            <div class="col-12 mt-6">
            <h2 class="mb-4" style="font-size: xx-large; font-weight: 200;">${producto.tipo}</h2>
                <div class="row">
                    ${decoOpciones.map(deco => `
                        <div class="col-4">
                            <img src="${deco.imagen}" class="img-fluid mb-2 deco-option w-100" alt="${deco.decoSimple}" data-factor="${deco.factor}" onclick="seleccionarDeco(this)"/>
                            <hr>
                            <p style="font-size: 1.2rem;">${deco.decoSimple}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>`;

    document.getElementById("nombresTorta").innerHTML = contenidoHTML;
}

let factorDecoSeleccionado = 1;

const seleccionarDeco = (elemento) => {
    document.getElementById("imagenPrincipal").src = elemento.src;
    factorDecoSeleccionado = parseFloat(elemento.dataset.factor);
    mostrarPrecio();
}

const mostrarPrecio = () => {
    const valorSeleccionado = parseInt(document.getElementById("cantidadPorciones").value);
    const productoSeleccionado = tiposTorta.find(item => item.id === valorSeleccionado);

    if (!productoSeleccionado) {
        errorCarga()
        return;
    }

    const precioTotal = productoSeleccionado.precioPorcion * valorSeleccionado * factorDecoSeleccionado;

    document.getElementById("precioTotal").innerHTML = `Precio total: $${precioTotal.toFixed(0)}`;
    document.getElementById("nombre").innerHTML = `${productoSeleccionado.nombre}`;
}

const enviarPedido = () => {
    const cantidadPorciones = document.getElementById("cantidadPorciones").value;
    const precioTotal = document.getElementById("precioTotal").textContent;

    if (cantidadPorciones === "¿Para cuántas personas es la torta?" || cantidadPorciones === "") {
        errorCarga();
        return;
    }

    if (precioTotal === "Precio total: $0") {
        errorCarga2();
        return;
    }

    mensaje();
};

function resetPage() {
    location.reload();
}
