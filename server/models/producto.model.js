import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema({
    title: {type: String, require: true},
    price: {type: Number, require: true},
    thumbnail: {type: String, require: true}
});

const ProductoModel = mongoose.model('productos', productoSchema);

export default ProductoModel;