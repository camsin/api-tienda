const mongoose = require('mongoose');
const schema = mongoose.Schema;

var productSchema = schema({
    name: String,
    price: Number
});

let Product = mongoose.model('Product', productSchema);

module.exports = {
    Product
};
