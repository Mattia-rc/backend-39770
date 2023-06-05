import { Router } from "express";

import Message from "../../models/messages.model.js";

const router = Router()

router.post('/', async (req, res, next) => {
   try {
    let usuarioMensaje = req.body.usuarioMensaje
    let inputChat = req.body.inputChat

    let response = Message.create({ usuarioMensaje, inputChat })

    if (response){
        return res.json({
            status: 200,
            message: 'mensaje y usuario guardado'
        })
    }
   } catch (error) {
    next(error)
   }
    });