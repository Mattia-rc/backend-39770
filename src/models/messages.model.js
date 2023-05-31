import { Schema, model } from "mongoose";


let collection = 'messages'

const schema = new Schema({
    nombreUsuario: {type: String, required:true},
    message: {type:String, required: true}
})

let Message = model(collection,schema)

export default Message