import { Router } from "express"
/* import manager from '../../managers/cart.js' */
import Carts from '../../models/cart.model.js'
import CartpID from "../../models/cartsUpdatePid.model.js"
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
router.put('/:cid', async(req,res,next)=> {
    try {
        let id = req.params.cid
        let data = req.body 

        let response = await Carts.findByIdAndUpdate(id,data)
        if (response) {
            return res.json({ status:200,message:'cart updated'})
        }
        return res.json({ status:404,message:'not found'})
    } catch(error) {
        next(error)
    }
})

 router.put("/:cid/product/:pid/:units", async (req, res, next) => {
    try {
      let id = req.params.pid;
      let cid = req.params.cid;
      let units = req.params.units;
  
      const cart = await CartpID.findById(cid);
      if (!cart) {
        return res.json({ status: 404, message: "not found" });
      }
  
      let product = cart.products.find(p => p.product_id === id);
      if (!product) {
        cart.products.push({ product_id: id, units });
      } else {
        product.units += units;
      }
  
      await cart.save();
  
      return res.json({ status: 200, message: "cart updated" });
    } catch (error) {
      next(error);
    }
  });
 

/*   router.put("/:cid/product/:pid/:units", async (req, res, next) => {
    try {
        let pid = req.params.pid;
        let cid = req.params.cid;
        let units = req.params.units;
        
        console.log(pid, cid, units)
        let response = await CartpID.findByIdAndUpdate(pid,units);
        console.log(response)
        if (response === 200) {
            return res.json({ status: 200, message: "cart updated" });
        }
        return res.json({ status: 404, message: "not found" });
    } catch (error) {
        next(error);
    }
}); */


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