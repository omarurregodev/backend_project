import mongoose from "mongoose";
import dotenv from 'dotenv';
import ProductSchema from "../models/producto.model.js";

// CONFIGURO MIS VARIABLES DE ENTORNO
dotenv.config();

export default class Producto {

    constructor() {
        this.url = process.env.MongoDBURL_ATLAS;
        this.mongodb = mongoose.connect;
    }
    
    async guardar(prod) {
        try {
            await this.mongodb(this.url);
            const newProduct = new ProductoModel(prod);
            return await newProduct.save();
        } catch (err) {
            throw new Error('No se pudo guardar el producto.');
        }
    }

    async listar(id) {
        try {
            await this.mongodb(this.url);
            return await ProductoModel.findById(id);
        } catch (err) {
            throw new Error('No se puede listar el producto.');
        }
    }

    async listarAll() {
        try {
            await this.mongodb(this.url);
            return await ProductSchema.find({});
        } catch (err) {
            throw new Error('No se pueden listar los productos.');
        }
    }


    async actualizar(prod, id) {
        try {
            await this.mongodb(this.url);
            return await ProductoModel.findByIdAndUpdate(id, prod,{ new: true });
        } catch (err) {
            throw new Error('El producto no pudo ser actualizado.');
        }
    }

    async borrar(id) {
        try {
            await this.mongodb(this.url);
            return await ProductoModel.findByIdAndDelete(id);
        } catch (err) {
            throw new Error('El producto no pudo ser eliminado.');
        }
    }
}