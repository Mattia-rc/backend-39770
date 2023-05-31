import { Router } from "express";

import Message from "../../models/messages.model";

const router = Router()

router.post('/', async (req, res, next) => {
    try {
        let usuario = req.body.usuarioMensaje
        let texto = req.body.inputChat
      

        let response = await Product.create( { usuario, texto } );
        if (response) {
            console.log("mensaje cargado")
        }
    
        return res.status(400).json({ status: 400, message: 'Message not save' }); 
        } catch (error) {
        next(error); 
        }
    });