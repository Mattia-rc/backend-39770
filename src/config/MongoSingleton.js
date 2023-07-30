import mongoose from "mongoose";

//get http:// dominio.com

class MongoSingleton {
    static #instance;
    constructor(){
        mongoose.connect('mongodb+srv://matti:Matti1889rc@db-matti.w8286ub.mongodb.net/commerce');
    }

    static getInstance(){
        if(this.#instance){
            console.log('Already connect')
            return this.#instance

        }
        this.#instance = new MongoSingleton()
        console.log('connected')
        return this.#instance
    }
}

export default MongoSingleton
