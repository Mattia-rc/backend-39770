import { Router } from "express"
import auth_router from "./auth.js"
import router_product from "./products.js"
import router_home from "./home.js"
import router_product_id from "./product.js"
import router_carts from "./carts.js"

const router = Router()


router.use('/products',router_product)
router.use('/',router_home)
router.use('/product',router_product_id)
router.use('/',router_carts)






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