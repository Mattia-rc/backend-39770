import {config} from '../config/config.js'
import nodemailer from 'nodemailer'
import { __dirname }  from './utils.js'

const transport = nodemailer.createTransport({
    service: 'gmail',
    port:587,
    auth:{
        user: config.gmail_user_app,
        pass: config.gmail_pass_app

    },
    tls: {
        rejectUnauthorized: false
    }
})

const sendMail = async () => {
    
    return await transport.sendMail({
    from: 'Mattia Bagni <matutebagni@gmail.com>',
    to: 'matutebagni@gmail.com',
    subject: 'correo de prueba',
    html: `<h1>email de prueba </h1>`,
    attachments: [{
        // filename: 'nodejs.png',
        // path: __dirname+'/nodejs.png',
        // cid: 'nodejs'
    }]
})

}

export default sendMail;