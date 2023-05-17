import { Router } from "express"

import fetch from "node-fetch";
const router_product = Router()

router_product.get(
    '/',
    async (req,res,next) => {
        try {
            const response = await fetch('http://localhost:8080/api/products')
            const data = await response.json()
            return res.render(
                'products',    //nombre de la vista
                {           //datos dinamicos que puede llegar a necesitar la vista
                    namepage: 'Iphone Rosario ',
                    products: data.products,
                    title: 'product',
                }        
            )
        } catch (error) {
            next(error)
        }
    }
)


export default router_product
