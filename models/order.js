const mongoose = require('mongoose');
const schema = mongoose.Schema;
const User = mongoose.model('User');
const Product = mongoose.model('Product');

var orderSchema = schema({
    user: {type: schema.ObjectId, ref: 'User'},
    total: Number,
    iva: Number,
    subtotal: Number,
    entries: [{type: schema.ObjectId, ref: 'Entry'}]
});

//me lo crea en la bd
let Order = mongoose.model('Order', orderSchema);

//exportamos para poder usar en controladores
module.exports = {
    Order
};
