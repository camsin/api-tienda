const mongoose = require('mongoose');
const schema = mongoose.Schema;
const User = mongoose.model('User');
const Product = mongoose.model('Product');

var entrySchema = schema({
    user: {type: schema.ObjectId, ref: 'User'},
    product: {type: schema.ObjectId, ref: 'Product'},
    cant: Number
});

//me lo crea en la bd
let Entry = mongoose.model('Entry', entrySchema);

//exportamos para poder usar en controladores
module.exports = {
    Entry
};
