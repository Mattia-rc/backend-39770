import server from "./app.js"
import { Server } from "socket.io"
import fs from 'fs'
import Carts from "./models/cart.model.js"

const PORT = process.env.PORT || 8080 
const ready = ()=> console.log('server ready on port '+PORT)

let http_server = server.listen(PORT,ready)
let socket_server = new Server(http_server)

let numUsers = 0;

socket_server.on("connection", socket => {
    socket.on("getCartContent", async (cartId) => {

        console.log("el servidor recibio una solicitud de carrito:", cartId)
        try {
            const cart = await Carts.findById(cartId)
    
            let i = cart.products.length

            socket.emit("cartUpdated", i)
        } catch (err) {
            console.log(err)
        }
    }) 
})

socket_server.on('connection', (socket) => {

// Chatroom

    let addedUser = false;

    socket.on('new message', (data) => {
        socket.broadcast.emit('new message', {
            username: socket.username,
            message: data
        });
        
    });

    socket.on('add user', (username) => {
        if (addedUser) return;

        socket.username = username;
        ++numUsers;
        addedUser = true;
        socket.emit('login', {
            numUsers: numUsers
        });
        socket.broadcast.emit('user joined', {
            username: socket.username,
            numUsers: numUsers
        });
    });

    socket.on('typing', () => {
        socket.broadcast.emit('typing', {
            username: socket.username
        });
    });

    socket.on('stop typing', () => {
        socket.broadcast.emit('stop typing', {
            username: socket.username
        });
    });
    socket.on('disconnect', () => {
        if (addedUser) {
            --numUsers;
        }
    });
});
