import { model, Schema } from "mongoose";

let collection = 'carts'

const schema = new Schema({
    products: {type: Array, required: true}
})

const Carts = model(collection, schema)

export default Carts