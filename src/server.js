import server from './app.js'
import { Server } from "socket.io"

const PORT = 8080
const ready = ()=> console.log('server ready on port '+PORT)

const http_server = server.listen(PORT,ready)
const socket_server = new Server(http_server)
let contador = 0;
const chats = [];
socket_server.on(       //on sirve para escuchar los mensajes que llegan (en este caso del cliente)
    'connection',       //identificador del mensaje a escuchar (el primero siempre connection)
    socket => {         //callback que se va a ejecutar apenas se conecta un cliente
        //console.log(socket)
        console.log(`client ${socket.client.id} connected`)
        socket.on(
            'primer_conexion',
            data=> {
                console.log(data.name)
                contador++
                socket_server.emit(
                    'contador',
                    { contador }
                )
            }
        )
        socket.on("auth", () => {
            //socket solo para cada cliente
            socket_server.emit("allMessagess", chats);
          });
          socket.on("new_message", (data) => {
            chats.push(data);
            console.log(chats);
            socket_server.emit("allMessagess", chats);
          });
    }
)