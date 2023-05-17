const socket = io()

function emit_data() {
    socket.emit( //emit envia datos (en este caso desde el cliente hacia el servidor)
        'primer_conexion', //identificador del mensaje
        { //objeto con las propiedades a enviar (en este caso al servidor)
            name: 'Mattia',
            last_name: 'Bagni',
            age: 19
        }
    )
}

let selectors = document.querySelectorAll('.btn')
console.log(selectors)
selectors.forEach(each => each.addEventListener('click', emit_data))

socket.on(
    'contador',
    data => console.log(data)
)

    socket.on('contador', data => {
        const contadorSpan = document.getElementById('contador');
        contadorSpan.innerText = data.contador;
    });