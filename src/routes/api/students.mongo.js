import { Router } from "express";

import Student from "../../models/students.js";

const router = Router()

router.post('/', async(req,res,next)=>{
    try{
       let one =  await Student.create(req.body)
        if(one){
            return res.json({
                status: 200,
                message: 'student created',
                id: one._id 
            })
        }
    }catch(error){
        next(error)
    }
})



 router.get('/', async(req,res,next)=>{
    try {
        let all = await Student.find()

        if(all){
          return  res.json({
                status: 200,
                message: all
            })
        }
    } catch (error) {
        next(error)
    }
 })
router.put('/:sid', async(req,res,next)=>{
try {
  let one =  await Student.findByIdAndUpdate(req.params.sid,req.body)
    if(one){
       return res.json({
            status: 200,
            message: 'estudiante actualizado '
        })
    }
} catch (error) {
    next(error)
}
})
 router.delete('/:sid', async(req,res,next)=>{
    try {
        let one = Student.findByIdAndDelete(req.params.sid)
        if(one){
            return res.json({
                status: 200,
                message: 'estudiante eliminado'
            })
        }
    } catch (error) {
        next(error)
    }
 })  
 

export default router