import { model, Schema } from "mongoose";
import Product from "../models/product.model.js"

const collections = "cartsId";

const schema = new Schema({
  cid: { type: String, required: true },
  products: [
    {
      pid: { type: String, required: true },
      units: { type: Number, required: true },
    }
  ],
});

schema.statics.reserve_stock = async function (cid, pid, x) {
  try {
    const cart = await this.findOne({ cid: cid });
    const product = await Product.findOne({ _id: pid });

console.log(cart)
    if (!product || product.stock < x || product.stock <= 0) {
      return null;
    }

    if (!cart) {
      await this.create({
        cid: cid,
        products: [{ pid: pid, units: x }]
      });
      return 200;
    }

    const index = cart.products.findIndex((e) => e.pid == pid);
    if (index === -1) {
      cart.products.push({
        pid: pid,
        units: x
      });
    } else {
      cart.products[index].units += Number(x);
    }

    product.stock -= x;
    await product.save();
    await cart.save();

    return 200;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const CartpID = model(collections, schema);

export default CartpID;