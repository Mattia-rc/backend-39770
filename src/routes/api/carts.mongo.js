
import { Router } from "express"
import Carts from '../../models/cart.model.js'
import Product from "../../models/product.model.js"

const router = Router()

router.post('/', async(req,res,next)=> {
    try {
        console.log(req.body)
        let response = await Carts.create(req.body)
        if (response) {
            return res.json({ status:200,message:'cart created'})
        }
        return res.json({ status:400,message:'not created'})
    } catch(error) {
        next(error)
    }
})
router.get('/', async(req,res,next)=> {
    try {
        let carts = await Carts.find()
        if (carts.length>0) {
            return res.json({ status:200,carts })
        }
        let message = 'not found'
        return res.json({ status:404,message })
    } catch(error) {
        next(error)
    }
})
router.get('/:cid', async(req,res,next)=> {
    try {
        let id = req.params.cid
        console.log(id)
        let cart = await Carts.findById(id)
        console.log(cart)
        if (cart) {
            return res.json({ status:200,cart })
        }
        let message = 'not found'
        return res.json({ status:404,message })
    } catch(error) {
        next(error)
    }
})

router.put("/:cid/product/:pid/:units", async (req, res, next) => {
    try {
        const { cid, pid, units } = req.params;
        let cart = await Carts.findById(cid);
        if (!cart) {
            return res.json({ status: 404, message: "Cart not found" }).status(404);
        }
        const product = await Product.findById(pid);
        if (!product) {
            return res.json({ status: 404, message: "Product not found" }).status(404);
        }
        const existingProduct = cart.products.find((item) => item.productId.equals(product._id));
        if (existingProduct) {
            existingProduct.quantity += Number(units);
        } else {
            cart.products.push({ productId: product._id, quantity: Number(units) });
        }
        const updatedCart = await Carts.findOneAndUpdate({ _id: cid }, { products: cart.products }, { new: true });
        return res.json({ status: 200, cart: updatedCart }).status(200);
    } catch (error) {
      next(error);
    }
});

router.delete('/:cid', async(req,res,next)=> {
    try {
        let id = Number(req.params.cid)
        let response = await Carts.findByIdAndDelete(id)
        if (response===200) {
            return res.json({ status:200,message:'cart deleted'})
        }
        return res.json({ status:404,message:'not found'})
    } catch(error) {
        next(error)
    }
})

router.delete("/:cid/product/:pid/:units", async (req, res, next) => {
        try {
        let id = Number(req.params.pid);
        let cid = Number(req.params.cid);
        let units = Number(req.params.units);
    
        let response = await manager.delete_cart(cid, id, units);
        if (response === 200) {
            return res.json({ status: 200, message: "Units Delete" });
        }
        return res.json({ status: 404, message: "not found" });
        } catch (error) {
        next(error);
        }
    });


export default router