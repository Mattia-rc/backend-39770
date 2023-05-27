import { model, Schema } from "mongoose";

let collections = "CartsID"

const CartSchema = new mongoose.Schema({
    customer_id: {type: Number, required: true},
    products: [{
      product_id: {type: Number, required: true},
      units: {type: Number, required: true},
    }],
  });

  const CartpID = model(collections,CartSchema)

  export default CartpID