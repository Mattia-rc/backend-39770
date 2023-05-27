import { model, Schema } from "mongoose";

let collections = "CartsID"

const schema = new Schema({
    products: [{
      product_id: {type: Number, required: true},
      units: {type: Number, required: true},
    }],
  });

  const CartpID = model(collections, schema)

  export default CartpID