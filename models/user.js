const mongoose = require('mongoose');
const schema = mongoose.Schema;

var userSchema = schema({
    name: String
});


//me lo crea en la bd
let User = mongoose.model('User', userSchema);

//exportamos para poder usar en controladores
module.exports = {
    User
};
