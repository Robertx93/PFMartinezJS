
let contenedorCarrito = document.querySelector("#pagina-carrito");

let carritoLS = JSON.parse(localStorage.getItem("carrito"));

carritoLS.forEach(producto => {
    let div = document.createElement("div");
    div.classList.add("pagina-carrito-producto");
    div.innerHTML = `
        <img class="producto-img" src="${producto.img}" alt="${producto.titulo}" style="width: 50px; height: auto;">
        <h3>${producto.titulo}</h3>
        <p>${producto.id}</p>
        <p>€${producto.precio} x ${cantidad}</p>
    `;

    contenedorCarrito.append(div);
});