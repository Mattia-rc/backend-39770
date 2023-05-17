import { Router } from "express";

const router_home = Router()

router_home.get(
        '/',
        async (req,res,next) => {
            try {
                return res.render(
                    'index',    //nombre de la vista
                    {           //datos dinamicos que puede llegar a necesitar la vista
                        namepage: 'Iphone Rosario ',
                        title: 'index',
                        script: '/public/connection.js'
                    }        
                )
            } catch (error) {
                next(error)
            }
    }
)


export default router_home