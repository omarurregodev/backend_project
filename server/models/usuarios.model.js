import mongoose from 'mongoose';

const usuariosSchema = mongoose.Schema({

    name: {type: String, require: true},
    lastName: {type: String, require: true},
    username: {type: String, require: true, unique: true},
    direccion: {type: String, require: true},
    password: {type: String, require: true}
});

const UsuariosModel = mongoose.model('usuarios', usuariosSchema);

export default UsuariosModel;