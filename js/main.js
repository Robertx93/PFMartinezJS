const carrito = [];

const productos = [
    {
        id: "1112",
        titulo: "Zarcillos piedra roja 18k",
        precio: 340,
        img: "./assets/images/01.webp",
    },
    {
        id: "1113",
        titulo: "Zarcillos infitino 18k",
        precio: 380,
        img: "./assets/images/02.webp",
    },
    {
        id: "1114",
        titulo: "Zarcillo diamante 18k",
        precio: 540,
        img: "./assets/images/03.webp",
    },
    {
        id: "1115",
        titulo: "Zarcillo turmelina baño de oro",
        precio: 280,
        img: "./assets/images/04.webp",
    },
    {
        id: "1116",
        titulo: "Zarcillo corazones 18k",
        precio: 365,
        img: "./assets/images/05.webp",
    },
    {
        id: "1117",
        titulo: "Zarcillo guindante 18k",
        precio: 270,
        img: "./assets/images/06.webp",
    },
    {
        id: "1118",
        titulo: "Cadena barbada 18k",
        precio: 970,
        img: "./assets/images/07.webp",
    },
    {
        id: "1119",
        titulo: "Dije divino niño 18k",
        precio: 180,
        img: "./assets/images/08.webp",
    },
    {
        id: "1120",
        titulo: "Cadena Maciza 14k",
        precio: 1080,
        img: "./assets/images/09.webp",
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
        <p>SKU ${producto.id}</p>
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
                <p>${producto.id}</p>
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

        let button = document.createElement("button");
        button.classList.add("btn-whatsapp");
        button.innerText = 'Enviar por WhatsApp';
        button.addEventListener('click', enviarPorWhatsApp);

        carritoProductos.append(button);
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


function enviarPorWhatsApp() {
    if (carrito.length === 0) return;
 
    let mensaje = 'Contenido de mi pedido:\n\n';
    let totalPedido = 0;
 
    for (let { producto, cantidad } of carrito) {
        mensaje += `${producto.titulo} codigo ${producto.id}: €${producto.precio} x ${cantidad} \n`;
        totalPedido += producto.precio * cantidad;
    }
 
    mensaje += `\nTotal: ${divisa}${totalPedido}`;
 
    const mensajeCodificado = encodeURIComponent(mensaje);
    const urlWhatsApp = `https://api.whatsapp.com/send?text=${mensajeCodificado}`;
    window.open(urlWhatsApp, '_blank');
 }