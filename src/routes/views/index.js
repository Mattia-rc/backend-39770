import { Router } from "express"
import auth_router from "./auth.js"

const router = Router()

router.get(
    '/',
    async (req,res,next) => {
        try {
            //let hola = chau
            return res.render(
                'index',    //nombre de la vista
                {           //datos dinamicos que puede llegar a necesitar la vista
                    namepage: 'Iphone Rosario ',
                    
                    //last_name: 'borraz',
                    alumnos: [
                        {name:'Iphone 14 pro max', photo:'https://grupotecargentina.com/wp-content/uploads/2022/10/Iphone-14-Pro-Max.jpg',description:'iphone 14 pro max blue'},
                        {name:'Iphone 12 pro max', photo:'https://www.citypng.com/public/uploads/preview/-21602651542ujkcgwlwka.png',description:'iphone 12 pro max red'},
                        {name:'Iphone 11 pro max', photo: 'https://m.media-amazon.com/images/I/81bsgUsPM-L.jpg',description:'iphone 11 pro max grey'}],
                    title: 'index',
                    script: '/public/connection.js'
                }        
            )
        } catch (error) {
            next(error)
        }
    }
)
router.get(
    '/new_product',
    async(req,res,next) => {
        try {
            return res.render(
                'new_product',
                {   title: 'new_product',
                    script: '/public/connection.js',
                    title: 'Product' }
            )
        } catch (error) {
            next()
        }
    }
)
router.get(
    '/chat',
    async(req,res,next) => {
        try {
            return res.render(
                'chat',
                {   title: 'chat',
                    script: '/public/chat.js',
                    title: 'chat' }
            )
        } catch (error) {
            next()
        }
    }
)

router.use('/auth',auth_router)


//router.use('/products',product_router)
//router.use('/carts',cart_router)

export default router
//en el enrutador principal de vistas
//UNICAMENTE llamo a los enrutadores de vistas de recursos
//el endpoint de prueba de la linea y ESTA MAL UBICADO