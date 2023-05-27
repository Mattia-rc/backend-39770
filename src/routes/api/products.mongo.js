import { Router } from "express"
import Product from "../../models/product.model.js"

import prod_manager from '../../managers/product.js'

const router = Router()

router.post('/', async (req, res, next) => {
    try {
        let title = req.body.title
        let description = req.body.description
        let price = Number(req.body.price)
        let thumbnail = req.body.thumbnail
        let stock = Number(req.body.stock)

        let response = await Product.create( { title, description, price, thumbnail, stock } );
        if (response) {
            return res.redirect('/products') 
        }
    
        return res.status(400).json({ status: 400, message: 'Product not created' }); 
        } catch (error) {
        next(error); 
        }
    });

router.get('/', async(req,res,next)=> {
    try {
        let products = await Product.find()
        if (products.length>0) {
            return res.json({ status:200,products })
        }
        let message = 'not found'
        return res.json({ status:404,message })
    } catch(error) {
        next(error)
    }
})

    
router.get('/:pid', async(req,res,next)=> {
    try {
        
        let id = req.params.pid
        console.log(id)
        let product = await Product.findById(id)
        if (product) {
            return res.json({ status:200,product })
        }
        let message = 'not found'
        return res.json({ status:404,message })
    } catch(error) {
        next(error)
    }
})
router.put('/:pid', async(req,res,next)=> {
    try {
        let id = req.params.pid
        let data = req.body
        let response = await Product.findByIdAndUpdate(id,data)
        if (response) {
            return res.json({ status:200,message:'product updated'})
        }
        return res.json({ status:404,message:'not found'})
    } catch(error) {
        next(error)
    }
})
router.delete('/:pid', async(req,res,next)=> {
    try {
        let id = req.params.pid
        let response = await Product.findByIdAndDelete(id)
        if (response) {
            return res.json({ status:200,message:'product deleted'})
        }
        return res.json({ status:404,message:'not found'})
    } catch(error) {
        next(error)
    }
})

export default router