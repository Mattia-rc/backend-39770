const socket = io()
let currentCart = "6472878ea5e397035b87a0e6"

function emit_data() {
    socket.emit( 
        'primer_conexion', 
        { 
            name: 'Mattia',
            last_name: 'Bagni',
            age: 19
        }
    )
}

socket.on("cartUpdated", (cartContent) => {
    console.log("el carrito tiene:", cartContent, "contenidos")

    const contadorSpan = document.getElementById('contador');
    contadorSpan.innerText = cartContent
})

socket.emit("getCartContent", currentCart)


