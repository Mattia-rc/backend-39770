import { model, Schema } from "mongoose";

let collection = 'carts'

const schema = new Schema( {
    products: [{
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          min: 1
        }
      }]
    }
)

const Carts = model(collection, schema)

export default Carts