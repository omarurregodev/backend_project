import mongoose from 'mongoose';
import UsuariosModel from '../models/usuarios.model.js';

class Usuario {

    constructor() {
        this.url = 'mongodb+srv://omarurregodev:oturrego0712@normalizrcluster.u64wunr.mongodb.net/?retryWrites=true&w=majority';
        this.mongodb = mongoose.connect;
    }
    
    async newUser(data) {
        try {
            await this.mongodb(this.url);
            const crearUsuario = new UsuariosModel(data);
            crearUsuario.save();
            return await crearUsuario;
        } catch (err) {
            throw new Error('No se pudo crear el usuario.');
        }
    }
    async listUsers() {
        try {
            await this.mongodb(this.url);
            return await UsuariosModel.find();
        } catch (err) {
            throw new Error('No se encontro el usuario.');
        }
    }
    async listUsersByID(id) {
        try {
            await this.mongodb(this.url);
            return await UsuariosModel.findById(id);
        } catch (err) {
            throw new Error('No se encontro el usuario.');
        }
    }

}

export default Usuario;