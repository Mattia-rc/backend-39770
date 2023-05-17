import { Router } from "express";

const router_carts = Router()

router_carts.get(
    '/carts',
    async(req,res,next) => {
        try {
            return res.render(
                'carts', 
                {
                    name: 'Nico',
                    last_name: 'Lopez',
                    photo: 'https://www.w3schools.com/howto/img_avatar.png',
                    script: "public/cart.js",
                    conection: '/public/conection.js'
            })
        } catch (error) {
            next()
        }
    }
)



export default router_carts