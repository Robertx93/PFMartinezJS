const carrito = [];

const productos = [
    {
        id: "abrigo-01",
        titulo: "Abrigo 01",
        precio: 3000,
        img: "./assets/images/01.webp",
    },
    {
        id: "abrigo-02",
        titulo: "Abrigo 02",
        precio: 3000,
        img: "./assets/images/02.webp",
    },
    {
        id: "abrigo-03",
        titulo: "Abrigo 03",
        precio: 3000,
        img: "./assets/images/03.webp",
    },
    {
        id: "abrigo-04",
        titulo: "Abrigo 04",
        precio: 3000,
        img: "./assets/images/04.webp",
    }
];

const divisa = '€';
const contenedorProductos = document.querySelector("#productos");
const carritoVacio = document.querySelector("#carrito-vacio");
const carritoProductos = document.querySelector("#carrito-productos");
const carritoTotal = document.querySelector("#carrito-total");

productos.forEach((producto) => {
    let div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
        <img class="producto-img" src="${producto.img}" alt="">
        <h3>${producto.titulo}</h3>
        <p>€${producto.precio}</p>
    `;

    let button = document.createElement("button");
    button.classList.add("producto-btn");
    button.innerText = "Agregar al carrito";
    button.addEventListener("click", () => {
        agregarAlCarrito(producto);
    });

    div.append(button);
    contenedorProductos.append(div);
});

const agregarAlCarrito = (producto) => {
    const indice = carrito.findIndex(item => item.producto.id === producto.id);

    if (indice !== -1) {
        carrito[indice].cantidad++;
    } else {
        carrito.push({ producto, cantidad: 1 });
    }

    actualizarCarrito();
}

function actualizarCarrito() {
    if (carrito.length === 0) {
        carritoVacio.classList.remove("d-none");
        carritoProductos.classList.add("d-none");
    } else {
        carritoVacio.classList.add("d-none");
        carritoProductos.classList.remove("d-none");

        carritoProductos.innerHTML = "";

        carrito.forEach(({ producto, cantidad }) => {
            let div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="producto-img" src="${producto.img}" alt="${producto.titulo}" style="width: 50px; height: auto;">
                <h3>${producto.titulo}</h3>
                <p>€${producto.precio} x ${cantidad}</p>
            `;

            let button = document.createElement("button");
            button.classList.add("carrito-producto-btn");
            button.innerText = "❌";
            button.addEventListener("click", () => {
                borrarDelCarrito(producto);
            });

            div.append(button);
            carritoProductos.append(div);
        });
    }

    actualizarTotal();
}

function borrarDelCarrito(producto) {
    const indice = carrito.findIndex(item => item.producto.id === producto.id);

    if (indice !== -1) {
        if (carrito[indice].cantidad > 1) {
            carrito[indice].cantidad--;
        } else {
            carrito.splice(indice, 1);
        }

        actualizarCarrito();
    }
}

function actualizarTotal() {
    const total = carrito.reduce((acc, { producto, cantidad }) => acc + (producto.precio * cantidad), 0);
    carritoTotal.innerText = divisa + total;
}